import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Video, ResizeMode } from "expo-av";
import LottieView from "lottie-react-native";

export interface MessageProps {
  id?: string | number;
  text?: string;
  audio?: string;
  video?: string;
  image?: string;
  date?: string;
  userId?: string | number;
  reply?: boolean;
  replyId?: string;
  left?: boolean;
}

const Message = ({ text, audio, video, image, left }: MessageProps) => {
  const videoRef = React.useRef<Video>(null);
  const [status, setStatus] = React.useState<Object>({});
  const animation = React.useRef<LottieView>(null);
  const [audioStarted, setAudioStarted] = React.useState<boolean>(false);
  return (
    <View style={styles.containerWrapper}>
      <View
        style={[
          styles.container,
          {
            width: "80%",
            height: audio ? 70 : "auto",
            backgroundColor:
              text || audio
                ? left
                  ? colors.light
                  : colors.secondary
                : colors.transparent,
            alignSelf: left ? "flex-start" : "flex-end",
            borderBottomEndRadius: left ? 50 : 0,
            borderBottomLeftRadius: left ? 0 : 50,
            paddingHorizontal: text ? 15 : 0,
            paddingVertical: text ? 10 : audio ? 5 : 0,
          },
        ]}
      >
        {audio && (
          <>
            <Text style={styles.time}>0:30</Text>
            <LottieView
              ref={animation}
              source={require("../../../assets/lottie/audio-waves.json")}
              style={{
                width: 150,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                if (audioStarted) {
                  animation.current?.pause();
                } else {
                  animation.current?.play();
                }
                setAudioStarted((currentValue) => !currentValue);
              }}
            >
              <MaterialCommunityIcons
                name={audioStarted ? "pause-circle" : "play-circle"}
                color={left ? colors.medium : colors.primary}
                size={40}
              />
            </TouchableOpacity>
          </>
        )}
        {text && (
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            ipsam
          </Text>
        )}
        {image && (
          <Image
            source={require("../../../assets/icon.png")}
            style={[
              styles.image,
              {
                borderBottomRightRadius: left ? 20 : 0,
                borderBottomLeftRadius: left ? 0 : 20,
              },
            ]}
            contentFit="cover"
          />
        )}
        {video && (
          <Video
            ref={videoRef}
            style={[
              styles.video,
              {
                borderBottomEndRadius: left ? 20 : 0,
                borderBottomLeftRadius: left ? 0 : 20,
              },
            ]}
            source={{
              uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        )}
      </View>
      <View
        style={[
          styles.flexRow,
          left
            ? {
                justifyContent: "flex-start",
              }
            : {
                justifyContent: "flex-end",
              },
        ]}
      >
        <Text style={styles.messageTime}>12:45</Text>
        {!left && (
          <MaterialCommunityIcons name="check-circle" color={colors.primary} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopEndRadius: 50,
    borderTopLeftRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  containerWrapper: {
    marginVertical: 10,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 20,
  },
  messageTime: {
    fontSize: 10,
  },
  time: {},
  video: {
    width: "100%",
    height: 300,
    borderRadius: 20,
  },
  wave: {},
  text: {},
});

export default Message;
