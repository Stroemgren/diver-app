import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { typography } from '../../styles/typography';

export interface ReadMoreTextProps {
    text: string;
}

export class ReadMoreText extends React.Component<ReadMoreTextProps> {
    public state: {
        expanded: boolean;
    }

    constructor(props: ReadMoreTextProps) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    render() {
        return (
            <View>
                <Text style={styles.text}>{this.state.expanded ? this.props.text : this.props.text.substring(0, 140) + '...'}</Text> 
                <TouchableOpacity onPress={() => this.setState({expanded: !this.state.expanded})} style={styles.button}>
                    <Text style={styles.buttonText}>{this.state.expanded ? 'Show less' : 'Show more'}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
