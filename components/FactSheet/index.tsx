import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { icons } from '../../icons';
import { ISite } from 'divermodels';
import { Caption, Title, Overline } from '../Typography';

export interface Fact {
    key: string;
    value: string;
    icon: string;
    backgroundColor: string;
}

export interface FactSheetProps {
    diveSpot: ISite;
    smallLayout: boolean;
}

export class FactSheet extends React.Component<FactSheetProps> {
    constructor(props: FactSheetProps) {
        super(props);
    }

    _formatFacts(diveSpot: ISite): Fact[] {
        let type: Fact;

        switch (diveSpot.diveType) {
            case 'reef':
                type = { key: 'Type', value: 'Reef', icon: 'coral', backgroundColor: '#91c95b' };
                break;
            case 'wreck':
                type = { key: 'Type', value: 'Wreck', icon: 'anchor', backgroundColor: '#ff9351' };
                break;
            case 'wall':
                type = { key: 'Type', value: 'Wall', icon: 'wall', backgroundColor: '#fe4f70' };
                break;
            default:
                type = { key: 'Type', value: 'Reef', icon: 'coral', backgroundColor: '#91c95b' };
        }

        const entry: Fact = diveSpot.entryType === 'shore' ? { key: 'Entry', value: 'Shore', icon: 'shore', backgroundColor: '#b775ff' } : { key: 'Entry', value: 'Boat', icon: 'yacht', backgroundColor: '#b775ff' }
        const depth: Fact = { key: 'Max depth', value: `${diveSpot.maxDepth}m`, icon: 'measurement', backgroundColor: '#3c96ff' }

        return [type, entry, depth]
    }

    render() {
        const facts = this._formatFacts(this.props.diveSpot);
        
        return (
            <View style={styles.factSheet}>
                {facts.map((fact, index) => {
                    return <View key={index} style={styles.factSheetItem}>
                                <View style={[styles.factSheetIcon, this.props.smallLayout ? styles.smallFactSheetIcon : {}]}>
                                    <Image style={[styles.factSheetIconImage, this.props.smallLayout ? styles.smallFactSheetIconImage : {}]} source={icons[fact.icon]}></Image>
                                </View>
                                <View style={styles.factSheetText}>
                                    <Overline theme={'light'} style={{fontSize: 8}}>{fact.key}</Overline>
                                    <Title theme={'light'} style={{fontSize: 13}}>{fact.value}</Title>
                                </View>
                            </View> 
                })}
            </View>
        );
        
        /*
        return (
            <View style={styles.factSheet}>
                {facts.map((fact, index) => {
                    return <View key={index} style={styles.factSheetItem}>
                                <View style={[styles.factSheetIcon, {backgroundColor: fact.backgroundColor}, this.props.smallLayout ? styles.smallFactSheetIcon : {}]}>
                                    <Image style={[styles.factSheetIconImage, this.props.smallLayout ? styles.smallFactSheetIconImage : {}]} source={icons[fact.icon]}></Image>
                                </View>
                                <View style={styles.factSheetText}>
                                    <Text style={[styles.factSheetKeyText, this.props.smallLayout ? styles.smallFactSheetKeyText : {}]}>{fact.key}</Text>
                                    <Text style={[styles.factSheetValueText, this.props.smallLayout ? styles.smallFactSheetValueText : {}]}>{fact.value}</Text>
                                </View>
                            </View> 
                })}
            </View>
        );
        */
    }
}
