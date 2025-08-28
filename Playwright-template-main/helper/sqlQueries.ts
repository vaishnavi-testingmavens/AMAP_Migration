export const getAccountDetails = `
Select * from bank_accounts where account_number='ACC10001'
`;

export const getAccountName = `
Select account_holder_name from bank_accounts where account_number='ACC10001'
`;

export const get2ItemsFromTable = `
Select * from bank_accounts limit 2
`;

export const insertFewDataIntoTable = `
        INSERT INTO bank_accounts (
        account_holder_name,
        account_number,
        account_type,
        balance,
        is_active
        )
        VALUES
        ('Mohan Lal', 'ACC10021', 'Savings', 10500.75, true),
        ('Tovino Thomas', 'ACC10022', 'Checking', 2500.00, true);
`;

// Dynamic query using a function
export function insertAccountQuery(
  name: string,
  accNo: string,
  type: string,
  balance: number,
  isActive: boolean
): string {
  return `
    INSERT INTO bank_accounts (
      account_holder_name,
      account_number,
      account_type,
      balance,
      is_active
    )
    VALUES
      ('${name}', '${accNo}', '${type}', ${balance}, ${isActive});
  `;
}
