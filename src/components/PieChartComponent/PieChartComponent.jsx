import React from 'react';
import './PieChartComponent.css'
import { PieChart, Pie, Cell } from "recharts";

const data2 = [
    { name: "Group A", value: 50 },
    { name: "Group B", value: 20 },
    { name: "Group C", value: 20 },
    { name: "Group D", value: 10 }
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
}: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};



const PieChartComponent = () => {
    return (
        <div className="container text-center" style={{ width: "100%" }}>
            <h3 className="pieChartTitle">The Pie Chart lorem</h3>
            <div  >
                <PieChart width={300} height={300}>
                    <Pie
                        data={data2}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data2.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </div>
        </div>
    );
};

export default PieChartComponent;