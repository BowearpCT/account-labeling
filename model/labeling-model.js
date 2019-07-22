const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    "labeling",
    {
        id_labeling: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        account_id: {
            type: Sequelize.STRING,
            references: {
                model: "accounts",
                key: "id_account"
            }
        },
        label_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "labels",
                key: "id_label"
            }
        },
        label_by_user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "users",
                key: "id_user"
            }
        },
        label_at: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)
