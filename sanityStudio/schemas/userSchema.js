export const userSchema = {
    name: 'users',
    title: 'Users',
    type: 'document',
    fields: [
      {
        name: 'address',
        title: 'Wallet Address',
        type: 'string',
      },
      {
        name: 'account_type',
        title: 'Account Type',
        type: 'string',
      },
      {
        name: 'name',
        title: 'User Name',
        type: 'string',
      },
      {
        name: 'government_id',
        title: 'Government ID',
        type: 'string',
      },
      {
        name: 'home_address',
        title: 'Home Address',
        type: 'string',
      },


    ],
  }