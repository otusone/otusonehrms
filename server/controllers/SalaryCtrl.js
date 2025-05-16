const SalarySlip = require("../models/salarySlip");
const UserModel = require("../models/UserModel");

exports.generateSalarySlip = async (req, res) => {
    try {
        const {
            userId,
            month,
            payDate,
            paidDays,
            lopDays,
            basicSalary,
            allowances,
            otherBenefits,
            grossEarnings,
            pf,
            tds,
            otherDeductions,
            totalDeductions,
            reimbursement1,
            reimbursement2,
            totalReimbursements,
            netSalary
        } = req.body;

        // Validation
        if (!userId || !month || basicSalary == null) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const parsedBasicSalary = Number(basicSalary) || 0;
        const parsedAllowances = Number(allowances) || 0;
        const parsedOtherBenefits = Number(otherBenefits) || 0;
        const parsedGrossEarnings = Number(grossEarnings) || (parsedBasicSalary + parsedAllowances + parsedOtherBenefits);

        const parsedPF = Number(pf) || 0;
        const parsedTDS = Number(tds) || 0;
        const parsedOtherDeductions = Number(otherDeductions) || 0;
        const parsedTotalDeductions = Number(totalDeductions) || (parsedPF + parsedTDS + parsedOtherDeductions);

        const parsedReimbursement1 = Number(reimbursement1) || 0;
        const parsedReimbursement2 = Number(reimbursement2) || 0;
        const parsedTotalReimbursements = Number(totalReimbursements) || (parsedReimbursement1 + parsedReimbursement2);

        const computedNetSalary =
            netSalary ?? (parsedGrossEarnings - parsedTotalDeductions + parsedTotalReimbursements);

        const slip = new SalarySlip({
            userId,
            employeeId: user.employeeId,
            userName: user.userName,
            email: user.email,
            month,
            designation: user.designation,
            dateOfJoining: user.dateOfJoining,
            payDate,
            paidDays,
            lopDays,
            basicSalary: parsedBasicSalary,
            allowances: parsedAllowances,
            otherBenefits: parsedOtherBenefits,
            grossEarnings: parsedGrossEarnings,
            pf: parsedPF,
            tds: parsedTDS,
            otherDeductions: parsedOtherDeductions,
            totalDeductions: parsedTotalDeductions,
            reimbursement1: parsedReimbursement1,
            reimbursement2: parsedReimbursement2,
            totalReimbursements: parsedTotalReimbursements,
            netSalary: computedNetSalary
        });

        await slip.save();

        return res.status(201).json({
            message: "Salary Slip Generated Successfully",
            slip
        });

    } catch (error) {
        console.error("Error generating salary slip:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.updateSalarySlip = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            userId,
            month,
            payDate,
            paidDays,
            lopDays,
            basicSalary,
            allowances,
            otherBenefits,
            grossEarnings,
            pf,
            tds,
            otherDeductions,
            totalDeductions,
            reimbursement1,
            reimbursement2,
            totalReimbursements,
            netSalary
        } = req.body;

        const slip = await SalarySlip.findById(id);

        if (!slip) {
            return res.status(404).json({ message: "Salary Slip is not found" });
        }


        slip.userId = userId ?? slip.userId;
        slip.month = month ?? slip.month;
        slip.payDate = payDate ?? slip.payDate;
        slip.paidDays = paidDays ?? slip.paidDays;
        slip.lopDays = lopDays ?? slip.lopDays;
        slip.basicSalary = basicSalary ?? slip.basicSalary;
        slip.allowances = allowances ?? slip.allowances;
        slip.otherBenefits = otherBenefits ?? slip.otherBenefits;
        slip.grossEarnings = grossEarnings ?? slip.grossEarnings;
        slip.pf = pf ?? slip.pf;
        slip.tds = tds ?? slip.tds;
        slip.otherDeductions = otherDeductions ?? slip.otherDeductions;
        slip.totalDeductions = totalDeductions ?? slip.totalDeductions;
        slip.reimbursement1 = reimbursement1 ?? slip.reimbursement1;
        slip.reimbursement2 = reimbursement2 ?? slip.reimbursement2;
        slip.totalReimbursements = totalReimbursements ?? slip.totalReimbursements;


        slip.netSalary =
            netSalary ??
            (Number(slip.grossEarnings || 0) -
                Number(slip.totalDeductions || 0) +
                Number(slip.totalReimbursements || 0));

        await slip.save();

        return res.status(200).json({
            message: "Salary slip updated successfully",
            slip
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error"
        });
    }
};

exports.getSalarySlipsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const slips = await SalarySlip.find({ userId }).sort({ createdAt: -1 }).populate("userId", "employeeId userName email designation dateOfJoining");

        if (!slips || slips.length === 0) {
            return res.status(404).json({ message: "No salary slips found for this user" });
        }

        res.status(200).json({
            message: "Salary slips fetched successfully",
            data: slips,
        });

    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};


exports.deleteSalarySlip = async (req, res) => {
    try {
        const { id } = req.params;
        const slip = await SalarySlip.findByIdAndDelete(id);
        if (!slip) return res.status(400).json({ message: "Salary Slip not found" });

        res.status(200).json({ message: "Salary Slip deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

exports.getAllSalarySlips = async (req, res) => {
    try {
        const slips = await SalarySlip.find()
            .populate("userId", "employeeId userName email designation dateOfJoining")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "All salary slips fetched successfully",
            data: slips,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

