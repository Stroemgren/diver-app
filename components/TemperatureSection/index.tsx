/*
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from './styles';
import { AreaChart, YAxis, XAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

const data = [
    {
        month: 'Jan',
        air: 18,
        water: 24
    },
    {
        month: 'Feb',
        air: 19,
        water: 22
    },
    {
        month: 'Mar',
        air: 21,
        water: 23
    },
    {
        month: 'Apr',
        air: 25,
        water: 24
    },
    {
        month: 'May',
        air: 29,
        water: 26
    },
    {
        month: 'Jun',
        air: 32,
        water: 27
    },
    {
        month: 'Jul',
        air: 33,
        water: 28
    },
    {
        month: 'Aug',
        air: 31,
        water: 29
    },
    {
        month: 'Sep',
        air: 27,
        water: 27
    },
    {
        month: 'Oct',
        air: 24,
        water: 27
    },
    {
        month: 'Nov',
        air: 23,
        water: 25
    },
    {
        month: 'Dec',
        air: 19,
        water: 24
    }
]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const points = data.reduce((acc, item) => {
    acc.push(item.air);
    acc.push(item.water);
    return acc;
}, [])
const min = Math.min(...points);
const max = Math.min(...points);
const colors = ['#7cd1ff', '#3c96ff']
const keys   = ['air', 'water']
const svgs = [
            { onPress: () => console.log('apples') },
            { onPress: () => console.log('bananas') }
        ]

export class TemperatureSection extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{...styles.infoLine, paddingLeft: 16}}>
                    <View style={{...styles.dot, backgroundColor: '#7cd1ff'}}></View>
                    <Text style={{color: '#777'}}>Air</Text>
                    <View style={styles.infoLineDivider}></View>
                    <View style={{...styles.dot, backgroundColor: '#3c96ff'}}></View>
                    <Text style={{color: '#777'}}>Water</Text>
                </View>
                <View style={{ height: 200, flexDirection: 'row' }}>
                    <AreaChart
                        style={ { flex: 1 } }
                        data={ data.map(d => d.air) }
                        curve={ shape.curveNatural }
                        contentInset={ { top: 20, bottom: 20 } }
                        svg={{ fill: 'rgba(124, 209, 255 , 0.5)' }}
                    />
                    <AreaChart
                        style={ StyleSheet.absoluteFill }
                        data={ data.map(d => d.water) }
                        curve={ shape.curveNatural }
                        contentInset={ { top: 20, bottom: 20 } }
                        svg={{ fill: 'rgba(60, 150, 255, 0.5)' }}
                    />
                    <YAxis
                        contentInset={ { top: 20, bottom: 20 } }
                        style={ { position: 'absolute', top: 0, bottom: 0, left: 8 }}
                        data={[14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34]}
                        svg={{
                            fill: 'black',
                            fontSize: 10,
                        }}
                        formatLabel={ value => `${value}ºC` }
                        svg={ {
                            fontSize: 8,
                            fill: 'rgba(0, 0, 0, 0.7)',
                            stroke: 'rgba(0, 0, 0, 0.7)',
                            strokeWidth: 0.1,
                            alignmentBaseline: 'baseline',
                            baselineShift: '3',
                        } }
                    />
                    <XAxis
                        contentInset={{ left: 20, right: 25 }}
                        style={ { position: 'absolute', bottom: 4, left: 0, width: 380 }}
                        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
                        formatLabel={ value => months[value] }
                        svg={{
                            fill: 'rgba(0, 0, 0, 0.7)',
                            stroke: 'rgba(0, 0, 0, 0.7)',
                            strokeWidth: 0.1,
                            fontSize: 8,
                            rotation: -20
                        }}
                    />
                </View>
            </View>
        );
    }
}
*/