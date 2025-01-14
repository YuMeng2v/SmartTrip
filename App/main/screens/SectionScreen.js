import React from "react";
import styled, { withTheme } from "styled-components";
import { TouchableOpacity, StatusBar, Linking, ScrollView } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import Ionicon from "react-native-vector-icons/Ionicons";
// import { setStatusBarHidden } from "expo-status-bar";
import { WebView } from "react-native-webview";
import Markdown from "react-native-showdown";

class SectionScreen extends React.Component {
	// fade in status bar
	componentDidMount() {
		// setStatusBarHidden(true, "fade");
		StatusBar.setBarStyle("light-content", true);
	}
	componentWillUnmount() {
		// setStatusBarHidden(false, "fade");
		StatusBar.setBarStyle("dark-content", true);
	}

	render() {
		// receive data
		const { navigation } = this.props;
		const section = navigation.getParam("section");

		return (
			<ScrollView style={{ backgroundColor: "white" }}>
				<Container>
					<StatusBar hidden />
					<Cover>
						<Image source={section.image} />
						<Wrapper>
							<Logo source={section.logo} />
							<Subtitle>{section.subtitle}</Subtitle>
						</Wrapper>
						<Title>{section.title}</Title>
						<Caption>{section.caption}</Caption>
					</Cover>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.goBack();
						}}
						style={{ position: "absolute", top: 20, right: 20 }}
					>
						<CloseView>
							<Ionicon name="ios-close" size={32} color="#4775f2" />
						</CloseView>
					</TouchableOpacity>
					<Content>
						{/* <WebView
						source={{ html: section.content + htmlStyles }}
						scalesPageToFit={false}
						scrollEnabled={false}
						ref="webview"
						onNavigationStateChange={event => {
							// open in Safari
							console.log(event);
							if (event.url != "about:blank") {
								this.refs.webview.stopLoading();
								Linking.openURL(event.url);
							}
						}}
					></WebView> */}
						<Markdown body={section.content} pureCSS={htmlStyles} scalesPageToFit={false} scrollEnabled={false} />
					</Content>
				</Container>
			</ScrollView>
		);
	}
}

export default SectionScreen;

// demo content
const htmlContent = `

<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

	<h2>This is a title</h2>
	<p>This <strong>is</strong> a <a href="http://google.com">link</a></p>
	<img src="https://cl.ly/8861f359ed6d/download/Wave14.jpg" />
	</body></html>
`;

const htmlStyles = `
	
		* {
			font-family: -apple-system, Roboto;
			margin: 0;
			padding: 0;
			font-size: 17px;
			font-weight: normal;
			color: #3c4560;
			line-height: 24px;
		}

		h2 {
			font-size: 20px;
			text-transform: uppercase;
			color: #b8bece;
			font-weight: 600;
			margin-top: 50px;
		}

		p {
			margin-top: 20px;
		}

		a {
			color: #4775f2;
			font-weight: 600;
			text-decoration: none;
		}

		strong {
			font-weight: 700;
		}

		img {
			width: 100%;
			border-radius: 10px;
			margin-top: 20px;
		}
	
`;

const Content = styled.View`
	height: 1000px;
	padding: 20px;
`;

const Container = styled.View`
	flex: 1;
`;

const Cover = styled.View`
	height: 375px;
`;

const Image = styled.Image`
	width: 100%;
	height: 100%;
	position: absolute;
`;

const Title = styled.Text`
	font-size: 24px;
	color: white;
	font-weight: bold;
	width: 170px;
	position: absolute;
	top: 78px;
	left: 20px;
`;

const Caption = styled.Text`
	color: white;
	font-size: 17px;
	position: absolute;
	left: 20px;
	bottom: 20px;
	width: 300px;
`;

const CloseView = styled.View`
	width: 32px;
	height: 32px;
	background: white;
	border-radius: 16px;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
	justify-content: center;
	align-items: center;
`;

const Wrapper = styled.View`
	flex-direction: row;
	position: absolute;
	top: 40px;
	left: 20px;
	align-items: center;
`;

const Logo = styled.Image`
	width: 24px;
	height: 24px;
`;

const Subtitle = styled.Text`
	font-size: 15px;
	font-weight: 600;
	color: rgba(255, 255, 255, 0.8);
	margin-left: 5px;
	text-transform: uppercase;
`;
