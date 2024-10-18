import mongoose from "mongoose";

const bankAccountSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    ifscCode: { type: String, required: true },
    branchName: { type: String, required: true},
    bankName: { type: String, required: true},
    accountNumber: { type: String, required: true, unique: true },
    accountHolderName: { type: String, required: true }
}, { timestamps: true });

const bankAccountModel = mongoose.models.bankAccountModel || mongoose.model('bankAccountModel', bankAccountSchema)

export default bankAccountModel;