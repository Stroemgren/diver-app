import React from 'react';
import { View } from 'react-native';
import { FactSheet } from '../../FactSheet';
import { CarouselCard } from '../CarouselCard';
import { Title, Caption } from '../../Typography';
import { ISite } from 'divermodels';

export interface SiteCardProps {
    site: ISite;
    onPress?: () => void;
}

export class SiteCard extends React.Component<SiteCardProps> {
    constructor(props: SiteCardProps) {
        super(props);
        this._handlePress = this._handlePress.bind(this);
    }

    _handlePress(): void {
        if (this.props.onPress !== undefined) {
            this.props.onPress();
        }
    }

    _borderColor(type: string | undefined): string {
        switch(type) {
            case 'reef':
                return '#91c95b';
            case 'wreck':
                return '#ff9351';
            case 'wall':
                return '#fe4f70';
            default:
                return '#91c95b';
        }
    }

    render() {
        const { site } = this.props;
        return (
            <CarouselCard onPress={this._handlePress} style={{height: 125, backgroundColor: '#576FE8'}}>
                <View style={{padding: 16, display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                    <View>
                        <Title theme={'light'}>{site.name}</Title>
                        <Caption theme={'light'}>{`${site.ocean}, ${site.country}`}</Caption>
                    </View>
                    <FactSheet diveSpot={site} smallLayout={true}></FactSheet>
                </View>
            </CarouselCard>
        )
        /*
        return (
            <CarouselCard onPress={this._handlePress} height={135} borderColor={this._borderColor(site.diveType)}>
                <View style={{padding: 16, display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                    <View>
                        <Title>{site.name}</Title>
                        <Caption>{`${site.ocean}, ${site.country}`}</Caption>
                    </View>
                    <FactSheet diveSpot={site} smallLayout={true}></FactSheet>
                </View>
            </CarouselCard>
        );
        */
    }
}