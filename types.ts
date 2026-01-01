
export interface Member {
  id: string;
  name: string;
  birthdayMonth: number; // 1-12
}

export interface MonthlyRecord {
  month: number;
  attendeeIds: string[];
  birthdayIds: string[]; // This will now be derived but kept for type compatibility if needed, or we can use the member property
  actualExpense: number;
}

export interface CalculationResult {
  month: number;
  actualAttendees: number;
  availableBudget: number;
  absentCount: number;
  absentContribution: number;
  surplus: number;
  extraPerPerson: number;
  payersCount: number;
}

export interface YearEndSummary {
  totalBonusPool: number;
  attendanceStats: Record<string, number>;
  eligibleMemberIds: string[];
  bonusPerPerson: number;
}
