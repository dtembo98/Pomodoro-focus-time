import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
export const Focus = ({ addSubject }) => {
	const [subject, setSubject] = useState(null);
	console.log('checking item ', subject);
	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.title}>
					{' '}
					What would you like to focus on ?
				</Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={{ flex: 1, marginRight: spacing.md }}
						onSubmitEditing={({ nativeEvent }) => {
							console.log('okay ', nativeEvent.text);
							setSubject(nativeEvent.text);
						}}
					/>
					<RoundedButton
						size={50}
						title='+'
						onPress={() => {
							console.log('adding item ', subject);
							addSubject(subject);
						}}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	innerContainer: {
		flex: 1,
		padding: spacing.md,
		justifyContent: 'center',
	},
	title: {
		color: colors.orage,
		fontWeight: 'bold',
		fontSize: fontSizes.lg,
	},
	inputContainer: {
		paddingTop: spacing.md,
		flexDirection: 'row',
		alignItems: 'center',
	},
});
