import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, } from 'react-native';
import { Provider, connect } from 'react-redux';
import { ruuiActions, RuuiProvider, Modal, Snackbar, Dropdown, DropdownContainer, Select } from '../../src';

import store from './store';
import ContextMenu from '../legacy/modal/contextMenu';
import * as appActions from './store/action/app';

type ContainerProps = {
	store?: any,
};

export default function AppContainer(props: ContainerProps) {
	return <RuuiProvider>
		<Provider store={store}>
			<App/>
		</Provider>
	</RuuiProvider>;
}

type Props = {
	counter?: String | Number,
	dispatch?: Function,
}

@connect(({ app }) => {
	return {
		counter: app.counter,
	};
})

class App extends Component {
	props: Props;

	constructor(props) {
		super(props);
		this.state = {
			activeSelect: selects[0],
		};
	}

	render() {
		return <View style={styles.container}>
			<Select
				options={selects}
				value={this.state.activeSelect}
				onSelect={next => this.setState({ activeSelect: next })}/>

			<TouchableOpacity
				style={{ marginTop: 10, padding: 12, backgroundColor: '#888888', borderRadius: 3 }}
				onPress={() => {
					// this.props.dispatch(appActions.increaseCounter());
					this.props.dispatch(ruuiActions.insertSnackBar({ message: 'Snackbar content..', }));
				}}>
				<Text>Add Snackbar {this.props.counter}</Text>
			</TouchableOpacity>

			<DropdownContainer
				dropdownWrapperStyle={{ width: 200, borderRadius: 5, }}
				dropdownComponent={ContextMenu}
				dropdownDirection="left-top"
				dropdownContext={{ name: 'Cloud' }}>
				<Text>Drop</Text>
			</DropdownContainer>

			<Snackbar/>
			<Modal/>
			<Dropdown/>
		</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, alignItems: 'center', justifyContent: 'center',
	},
});

function fillArray(len) {
	const res = [];
	for (let i = 0; i < len; i += 1) res.push(i + 1);
	return res;
}

const selects = [{
	title: 'Selection 1',
}, {
	title: 'Selection 2',
}, {
	title: 'Selection 3',
}, {
	title: 'Selection 4',
}];