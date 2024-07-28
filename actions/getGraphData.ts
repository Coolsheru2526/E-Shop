import moment from "moment";
import prisma from '@/libs/prismadb';

export default async function getGraphData() {
    try {
        const startData = moment().subtract(6, 'days').startOf('day');
        const endData = moment().endOf('day');

        const result = await prisma.order.groupBy({
            by: ["createDate"],
            where: {
                createDate: {
                    gte: startData.toISOString(),
                    lte: endData.toISOString(),
                },
                status: "complete",
            },
            _sum: {
                amount: true,
            },
        });

        const aggregatedData: {
            [day: string]: { day: string; date: string; totalAmount: number };
        } = {};
        let currentData = startData.clone();

        while (currentData.isSameOrBefore(endData, 'day')) {
            const day = currentData.format('dddd');
            aggregatedData[day] = {
                day,
                date: currentData.format('YYYY-MM-DD'),
                totalAmount: 0,
            };
            currentData.add(1, 'day');
        }

        result.forEach((entry) => {
            const day = moment(entry.createDate).format('dddd');
            const amount = entry._sum.amount || 0;
            aggregatedData[day].totalAmount += amount;
        });

        const formattedData = Object.values(aggregatedData).sort((a, b) => 
            moment(a.date).diff(moment(b.date))
        );
        return formattedData;
    } catch (error: any) {
        throw new Error(error);
    }
}
