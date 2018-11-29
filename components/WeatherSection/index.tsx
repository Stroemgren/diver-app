import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { icons } from '../../icons';

export interface WeatherSectionProps {
    latitude: number;
    longitude: number;
}

export class WeatherSection extends React.Component<WeatherSectionProps> {
    public state: {
        isLoading: boolean;
        days: { weekday: string, temperature: number, icon: string }[];
    }

    constructor(props: WeatherSectionProps) {
        super(props);

        this.state = { 
            isLoading: true,
            days: [] 
        }
    }

    componentDidMount() {
        fetch(`http://68.183.67.209/api/weather?latitude=${this.props.latitude}&longitude=${this.props.longitude}`)
            .then((response) => response.json())
            .then((forecastDays: any[]) => {
                this.setState({
                    isLoading: false,
                    days: forecastDays.map((day: any, index: number) => {
                        return { weekday: this._formatWeekdayFromIndex(index), temperature: day.temperature, icon: day.icon }
                    }),
                });
            })
            .catch((error) =>{
                // TODO: Proper error handling
                console.error(error);
            });
    }

    _formatWeekdayFromIndex(index: number) {
        const date = new Date();
        date.setDate(date.getDate() + index);
        const weekDayIndex = date.getDay();

        switch(weekDayIndex) {
            case 0:
                return 'SUN';
            case 1:
                return 'MON';
            case 2:
                return 'TUE';
            case 3:
                return 'WED';
            case 4:
                return 'THU';
            case 5:
                return 'FRI';
            case 6:
                return 'SAT';
        }
    }

    render() {
        return (
            <View style={styles.weatherSection}>
                {this.state.days.map((day, index) => {
                    return  <View key={index} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Text style={styles.dayText}>{day.weekday}</Text>
                                <Image style={styles.weatherIcon} source={icons.weather[day.icon]}></Image>
                                <Text style={styles.degresstext}>{day.temperature}°</Text>
                            </View>
                })}
            </View>
        );
    }
}
