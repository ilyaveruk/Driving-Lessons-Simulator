import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';

import Title from './Title';
import {useEffect} from "react";
import {collection, getDocs} from "firebase/firestore";
import db from "../utils/Firebase";


export default function Chart() {
    const theme = useTheme();
    const [formattedData, setFormattedData] = React.useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getDocs(collection(db, "ratings"));
            let formattedData = data.docs.map(doc => {
                const docData = doc.data();
                const date = docData.timestamp.toDate();
                docData.date = date.toISOString().split('T')[0]; // Get the date part of the timestamp
                docData.timestamp = date.getTime(); // Convert timestamp to number
                return {id: doc.id, ...docData};
            });

            // Group the data by date and count the number of ratings for each date
            const groupedData = formattedData.reduce((acc, cur) => {
                acc[cur.date] = (acc[cur.date] || 0) + 1; // Increment the count for this date
                return acc;
            }, {});

            // Convert the grouped data to the format expected by the chart
            let chartData = Object.entries(groupedData).map(([time, amount]) => ({ time, amount }));
            // Sort the data by date
            chartData = chartData.sort((a, b) => a.time.localeCompare(b.time));

            setFormattedData(chartData);
        };

        fetchData();

    }, []);

    return (
        <React.Fragment>
            <Title>Number of ratings per day</Title>
            <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
                <LineChart
                    dataset={formattedData}
                    margin={{
                        top: 16,
                        right: 20,
                        left: 70,
                        bottom: 40,
                    }}
                    xAxis={[
                        {
                            label: 'Date',
                            scaleType: 'band',
                            dataKey: 'time',
                            tickNumber: 2,
                            tickLabelStyle: theme.typography.body2,
                            labelStyle: {
                                ...theme.typography.body1,
                                fill: theme.palette.text.primary,
                            },
                        },
                    ]}
                    yAxis={[
                        {
                            label: 'Num of ratings',
                            labelStyle: {
                                ...theme.typography.body1,
                                fill: theme.palette.text.primary,
                            },
                            tickLabelStyle: theme.typography.body2,
                            max: 20,
                            tickNumber: 3,
                        },
                    ]}
                    series={[
                        {
                            dataKey: 'amount',
                            showMark: false,
                            color: theme.palette.primary.light,
                        },
                    ]}
                    sx={{
                        [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
                        [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
                        [`& .${axisClasses.left} .${axisClasses.label}`]: {
                            transform: 'translateX(-25px)',
                        },
                    }}
                />
            </div>
        </React.Fragment>
    );
}