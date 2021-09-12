import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Focus } from './src/features/Focus/Focus';
import { colors } from './src/utils/colors';
import { Timer } from './src/features/Timer/Timer';
import { FocusHistory } from './src/features/Focus/FocusHistory';
import {} from '.';

const STATUSES = {
	COMPLETE: 1,
	CANCELLED: 2,
};

export default function App() {
	const [focusSubject, setFocusSubject] = useState(null);
	const [focusHistory, setFocusHistory] = useState([]);

	const addFocusHistorySubjectWithStatus = (focusSubject, status) => {
		setFocusHistory([
			...focusHistory,
			{ key: String(focusHistory.length + 1), focusSubject, status },
		]);
	};
	const onClear = () => {
		setFocusHistory([]);
	};

	console.log(focusHistory);

	const saveFocusHistory = async () => {
		try {
			console.log('ok', JSON.stringify(focusHistory));
			await AsyncStorage.setItem(
				'focusHistory',
				JSON.stringify(focusHistory)
			);
		} catch (e) {
			console.log(e);
		}
	};

	const loadFocusHistory = async () => {
		try {
			const history = await AsyncStorage.getItem('focusHistory');
			console.log('it works ', history);
			if (history && JSON.parse(history).length) {
				setFocusHistory(JSON.parse(history));
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		loadFocusHistory();
	}, []);

	useEffect(() => {
		saveFocusHistory();
	}, [focusHistory]);

	return (
		<View style={styles.container}>
			{focusSubject ? (
				<Timer
					focusSubject={focusSubject}
					onTimerEnd={() => {
						addFocusHistorySubjectWithStatus(
							focusSubject,
							STATUSES.COMPLETE
						);
						setFocusSubject(null);
					}}
					clearSubject={() => {
						addFocusHistorySubjectWithStatus(
							focusSubject,
							STATUSES.CANCELLED
						);
						setFocusSubject(null);
					}}
				/>
			) : (
				<View style={{ flex: 0.5 }}>
					<Focus addSubject={setFocusSubject} />
					<FocusHistory
						focusHistory={focusHistory}
						onClear={onClear}
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50,
		backgroundColor: colors.darkBlue,
	},
});
