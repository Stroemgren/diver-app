import * as React from 'react';
import { View } from 'react-native';
import { Title } from '../../components/Typography';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';

export interface CenterProps {
    navigation: NavigationScreenProp<any, any>;
}

const mapStateToProps = (state: RootState, props: CenterProps) => {
    return {}; 
}
  
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
    return {};
}

class Center extends React.Component<CenterProps> {
    constructor(props: CenterProps) {
        super(props);
    }

    render() {
        return (
            <View>
                <Title>DiveCenter</Title>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Center)