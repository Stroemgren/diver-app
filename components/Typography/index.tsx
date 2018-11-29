import React from 'react';
import { Text, TextStyle } from 'react-native';

export interface TextProps {
    style?: TextStyle;
    theme?: 'light' | 'dark';
}

export class Display extends React.Component<TextProps> {
    constructor(props: TextProps) {
        super(props);
    }

    render() {
        const theme = this.props.theme || 'dark';
        return (
            <Text style={[{
                color: theme === 'dark' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)',
                fontFamily: 'RobotoRegular',
                fontSize: 30,
                letterSpacing: 0.25 
            }, this.props.style || {}]}>{this.props.children}</Text>
        );
    }
}

export class Headline extends React.Component {
    render() {
        return (
            <Text style={{
                color: 'rgba(0, 0, 0, 0.87)',
                fontFamily: 'RobotoRegular',
                fontSize: 24,
                letterSpacing: 0 
            }}>{this.props.children}</Text>
        );
    }
}

export class SectionTitle extends React.Component<TextProps> {
    constructor(props: TextProps) {
        super(props);
    }

    render() {
        return (
            <Text style={[{
                color: 'rgba(0, 0, 0, 0.87)',
                fontFamily: 'RobotoMedium',
                fontSize: 16,
                letterSpacing: 0.25 
            }, this.props.style || {}]}>{this.props.children}</Text>
        );
    }
}

export class Title extends React.Component<TextProps> {
    constructor(props: TextProps) {
        super(props);
    }

    render() {
        const theme = this.props.theme || 'dark';
        return (
            <Text style={[{
                color: theme === 'dark' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)',
                fontFamily: 'RobotoRegular',
                fontSize: 20,
                letterSpacing: 0.15 
            }, this.props.style || {}]}>{this.props.children}</Text>
        );
    }
}

export class Subtitle extends React.Component<TextProps> {
    constructor(props: TextProps) {
        super(props);
    }

    render() {
        const theme = this.props.theme || 'dark';
        return (
            <Text style={[{
                color: theme === 'dark' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)',
                fontFamily: 'RobotoRegular',
                fontSize: 16,
                letterSpacing: 0.15
            }, this.props.style || {}]}>{this.props.children}</Text>
        );
    }
}

export class Body1 extends React.Component {
    render() {
        return (
            <Text style={{
                color: 'rgba(0, 0, 0, 0.87)',
                fontFamily: 'RobotoRegular',
                fontSize: 16,
                letterSpacing: 0.5 
            }}>{this.props.children}</Text>
        );
    }
}

export class Body2 extends React.Component {
    render() {
        return (
            <Text style={{
                color: 'rgba(0, 0, 0, 0.87)',
                fontFamily: 'RobotoRegular',
                fontSize: 14,
                letterSpacing: 0.25 
            }}>{this.props.children}</Text>
        );
    }
}

export class Caption extends React.Component<TextProps> {
    constructor(props: TextProps) {
        super(props);
    }

    render() {
        const theme = this.props.theme || 'dark';
        return (
            <Text style={[{
                color: theme === 'dark' ? 'rgba(0, 0, 0, 0.54)' : 'rgba(255, 255, 255, 0.54)',
                fontFamily: 'RobotoRegular',
                fontSize: 12,
                letterSpacing: 0.4 
            }, this.props.style]}>{this.props.children}</Text>
        );
    }
}

export class Overline extends React.Component<TextProps> {
    constructor(props: TextProps) {
        super(props);
    }

    render() {
        const theme = this.props.theme || 'dark';
        return (
            <Text style={[{
                color: theme === 'dark' ? 'rgba(0, 0, 0, 0.54)' : 'rgba(255, 255, 255, 0.54)',
                fontFamily: 'RobotoRegular',
                fontSize: 10,
                letterSpacing: 0.5,
                textTransform: 'uppercase' 
            }, this.props.style]}>{this.props.children}</Text>
        );
    }
}