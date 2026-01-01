
import { MonthlyRecord, CalculationResult, YearEndSummary } from '../types';
import { MEMBERS, MONTHLY_CONTRIBUTION, MAX_ABSENCES_FOR_BONUS } from '../constants';

export const calculateMonth = (record: MonthlyRecord): CalculationResult => {
  const actualAttendees = record.attendeeIds.length;
  const availableBudget = actualAttendees * MONTHLY_CONTRIBUTION;
  const absentCount = MEMBERS.length - actualAttendees;
  const absentContribution = absentCount * MONTHLY_CONTRIBUTION;
  
  let surplus = 0;
  let extraPerPerson = 0;
  let payersCount = 0;

  if (record.actualExpense < availableBudget) {
    surplus = availableBudget - record.actualExpense;
  } else if (record.actualExpense > availableBudget) {
    const extraTotal = record.actualExpense - availableBudget;
    // Payers are attendees minus birthday people who are also attending
    const attendingBirthdayIds = record.birthdayIds.filter(id => record.attendeeIds.includes(id));
    payersCount = actualAttendees - attendingBirthdayIds.length;
    
    if (payersCount > 0) {
      extraPerPerson = extraTotal / payersCount;
    }
  }

  return {
    month: record.month,
    actualAttendees,
    availableBudget,
    absentCount,
    absentContribution,
    surplus,
    extraPerPerson,
    payersCount
  };
};

export const calculateYearEnd = (records: MonthlyRecord[]): YearEndSummary => {
  let totalBonusPool = 0;
  const attendanceStats: Record<string, number> = {};

  MEMBERS.forEach(m => attendanceStats[m.id] = 0);

  records.forEach(record => {
    const result = calculateMonth(record);
    // Function 1: Absent contribution to pool
    totalBonusPool += result.absentContribution;
    // Function 2: Surplus to pool
    totalBonusPool += result.surplus;

    // Track absences
    MEMBERS.forEach(m => {
      if (!record.attendeeIds.includes(m.id)) {
        attendanceStats[m.id]++;
      }
    });
  });

  // Function 4: Eligibility
  const eligibleMemberIds = MEMBERS.filter(m => attendanceStats[m.id] <= MAX_ABSENCES_FOR_BONUS).map(m => m.id);
  const bonusPerPerson = eligibleMemberIds.length > 0 ? totalBonusPool / eligibleMemberIds.length : 0;

  return {
    totalBonusPool,
    attendanceStats,
    eligibleMemberIds,
    bonusPerPerson
  };
};
