import React, { createRef } from 'react';
import { View, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const itemWidth = viewportWidth - 36;

export interface CardCarouselProps {
    cards: React.ReactElement<any>[];
    onItemSnap?: (index: number) => void;
}

export class CardCarousel extends React.Component<CardCarouselProps> {
    private carousel: any = createRef();

    constructor(props: CardCarouselProps) {
        super(props);
        this.handleItemSnap = this.handleItemSnap.bind(this);
    }

    public moveToItem(index: number) {
        if (this.carousel.current) {
            this.carousel.current.snapToItem(index)
        }
    }

    handleItemSnap(index: number) {
        if (this.props.onItemSnap !== undefined) {
            this.props.onItemSnap(index);
        }
    }

    render() {
        return (<Carousel
                    ref={this.carousel}
                    data={this.props.cards}
                    renderItem={(item: {item: any}) => {
                        const Entry = item.item;
                        return Entry
                    }}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    sliderWidth={viewportWidth}
                    itemWidth={itemWidth}
                    onSnapToItem={this.handleItemSnap}
                />
        );
    }
}