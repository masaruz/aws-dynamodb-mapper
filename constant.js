module.exports = {
    SCHEMA: {
        MODEL: {
            Timestamp: Number
        },
        ACCOUNT: {
            AccountId: String,
            Name: String,
            Log: {
                LogId: String,
                Timestamp: Number,
                Meta: {
                    Padding: Number,
                    Offset: Number
                }    
            },
            IsActive: Boolean,
            Medals: Array,
            Age: Number
        }
    },
    TABLE_NAME: {
        ACCOUNT: 'Accounts'
    }
}