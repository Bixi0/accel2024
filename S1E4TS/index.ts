interface ITaxPayer {
    name: string;
    annualIncome: number;
    expenses: number[];
}
  
class TaxCalculator {
    private baseRate: number = 0.15;
  
    calculateTax(taxPayer: ITaxPayer): number {
      let totalExpenses = 0
      let netIncome = taxPayer.annualIncome - totalExpenses
      
      taxPayer.expenses.forEach((expense) => {
        totalExpenses += expense
      })

      return netIncome * this.baseRate
    }
  
    applyDeduction(taxPayer: ITaxPayer, deduction: number): ITaxPayer {
      taxPayer.annualIncome -= deduction
      return taxPayer
    }
  
    generateReport(taxPayers: ITaxPayer[]): string {
      let report: string = 'TAX REPORT'

      taxPayers.forEach((person) => {
        report += (`\nName: ${person.name} \nExpenses: \n${person.expenses}\n`)
      })

      return report
    }
}