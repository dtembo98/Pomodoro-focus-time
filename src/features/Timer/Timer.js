import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton/RoundedButton';
import { Timing } from './Timing';

const DEFAULT_TIME = 20;
export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
	const [minutes, setMinutes] = useState(DEFAULT_TIME);
	const [isStarted, setIsStarted] = useState(false);
	const [progress, setProgress] = useState(1);

	useKeepAwake();

	const onProgress = (progress) => {
		setProgress(progress);
	};

	const vibrate = () => {
		if (Platform.OS === 'ios') {
			const interval = setInterval(() => Vibration.vibrate(), 1000);
			setTimeout(() => clearInterval(interval), 10000);
		} else {
			Vibration.vibrate(10000);
		}
	};
	const onEnd = () => {
		vibrate();
		setMinutes(DEFAULT_TIME);
		setProgress(1);
		setIsStarted(false);
		onTimerEnd();
	};
	const changeTime = (min) => {
		setMinutes(DEFAULT_TIME);
		setProgress(1);
		setIsStarted(false);
	};

	return (
		<View style={styles.container}>
			<View style={styles.countdown}>
				<Countdown
					minutes={minutes}
					isPaused={!isStarted}
					onProgress={onProgress}
					onEnd={onEnd}
				/>
			</View>
			<View style={{ paddingTop: spacing.xxl }}>
				<Text style={styles.title}>Focusing on: </Text>
				<Text style={styles.task}> {focusSubject}</Text>
			</View>
			<View style={{ paddingTop: spacing.sm }}>
				<ProgressBar
					color='#5E84E2'
					style={{ height: 10 }}
					progress={progress}
				/>
			</View>
			<View style={styles.buttonWrapper}>
				<Timing onChangeTime={changeTime} />
			</View>
			<View style={styles.buttonWrapper}>
				{isStarted ? (
					<RoundedButton
						title='pause'
						onPress={() => setIsStarted(false)}
					/>
				) : (
					<RoundedButton
						title='start'
						onPress={() => setIsStarted(true)}
					/>
				)}
			</View>
			<View style={styles.clearSubject}>
				<RoundedButton
					title='x'
					size={50}
					onPress={() => clearSubject()}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: Platform.OS === 'ios' ? spacing.md : spacing.lg,
	},
	title: {
		color: colors.orage,
		textAlign: 'center',
	},
	task: {
		color: colors.orage,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	countdown: {
		flex: 0.5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonWrapper: {
		flex: 0.3,
		padding: 15,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	clearSubject: {
		paddingBottom: 25,
		paddingLeft: 25,
	},
});
