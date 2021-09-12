import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
export const RoundedButton = ({
	style = {},
	textStyle = {},
	size = 125,
	...props
}) => {
	return (
		<TouchableOpacity style={[styles(size).radius, style]}>
			<Text style={[styles(size).text, textStyle]} {...props}>
				{props.title}
			</Text>
		</TouchableOpacity>
	);
};

const styles = (size) =>
	StyleSheet.create({
		radius: {
			borderRadius: size / 2,
			width: size,
			height: size,
			alignItems: 'center',
			borderColor: colors.orage,
			borderWidth: 2,
			justifyContent: 'center',
		},
		text: {
			color: colors.orage,
			fontSize: size / 3,
		},
	});
