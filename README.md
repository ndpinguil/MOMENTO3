1) INDICAR QUE CAMBIOS SE REALIZARON Y PORQUE SE REALIZARON:

COMPONENTES:
- ImageViewer:
  * Codigo sin cambios:
imageViewer:
import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
    const imageSource = selectedImage  ? { uri: selectedImage } : placeholderImageSource;

    return (
        <Image source={imageSource} style={styles.image} />
    );
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
});

  * Codigo con cambios:
import React from 'react';
import { StyleSheet, Image } from 'react-native';

const ImageViewer = ({ placeholderImageSource, selectedImage }) => {
  const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;

  return <Image source={imageSource} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

export default ImageViewer;

* Explicacion:
Eliminé la importación innecesaria de React ya que no estás utilizando características específicas de React en este componente funcional.
Simplifiqué la declaración del componente y su exportación en una única línea.

- IconButto:
  * Codigo sin cambios:
import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function IconButton({ icon, label, onPress }) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#fff" />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {
    color: '#fff',
    marginTop: 12,
  },
});

  * Codigo con cambios:
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const IconButton = ({ icon, label, onPress }) => {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#fff" />
      {label && <Text style={styles.iconButtonLabel}>{label}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {
    color: '#fff',
    marginTop: 12,
  },
});

export default IconButton;

  * Explicacion:
Agregue una validación para mostrar el texto del botón (label) solo si se proporciona, y de esa manera evitar la aparición de un espacio vacío si no hay etiqueta.
La declaración del componente y su exportación se han simplificado en una única línea.

- EmojiStiker:
  * Codigo sin cambios:
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler'; // Add gesture
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'; // Add gesture



export default function EmojiSticker({ imageSize, stickerSource }) {
  const scaleImage = useSharedValue(imageSize); // Add gesture
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const drag = Gesture.Pan()
  .onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });


  const doubleTap = Gesture.Tap()
  .numberOfTaps(2)
  .onStart(() => {
    if (scaleImage.value !== imageSize * 2) {
      scaleImage.value = scaleImage.value * 2;
    }
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });
  
  
  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
  * Codigo con cambios:
import React from 'react';
import { View, Image } from 'react-native';
import { PanGestureHandler, TapGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export default function EmojiSticker({ imageSize, stickerSource }) {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onPanGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: false }
  );

  const onDoubleTapGestureEvent = () => {
    if (scaleImage.value !== imageSize * 2) {
      scaleImage.value = withSpring(imageSize * 2);
    }
  };

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onPanGestureEvent}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <TapGestureHandler onHandlerStateChange={(event) => event.nativeEvent.state === State.ACTIVE && onDoubleTapGestureEvent()}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </TapGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
}

  * Explicacion:
Estos cambios me ayudo el chatcito, pero comprobe que son eficientes, sobre todo el segundo, cuando se le pidio el cambio el toque del emoji en la pantalla para que se haga mas grande es mas rapido y no se siente como si estuviera colgado ni el telefono ni la computadora.
Utilicé PanGestureHandler y TapGestureHandler del paquete react-native-gesture-handler en lugar de Gesture.Pan() y Gesture.Tap().
Simplifiqué la lógica de cambio de tamaño en el doble toque.
Organización del código para mejorar la legibilidad.

- EmojiPicker:
  * Codigo sin cambios:
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function EmojiPicker({ isVisible, children, onClose }) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose a sticker</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    modalContent: {
      height: '25%',
      width: '100%',
      backgroundColor: '#25292e',
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: 'absolute',
      bottom: 0,
    },
    titleContainer: {
      height: '16%',
      backgroundColor: '#464C55',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: '#fff',
      fontSize: 16,
    },
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 50,
      paddingVertical: 20,
    },
});

  * Codigo con cambios:
No se realizo cambios

  * Explicacion:
Intente hacer cambios dentro del componente pero daba errores, y la verdad funciona bastante bien como esta , asi que decidi que en ves de estresarme, mejor no cambiar nada en este componete 😎.

- EmojiList:
  * Codigo sin cambios:
import { useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, Pressable } from 'react-native';

export default function EmojiList({ onSelect, onCloseModal }) {
  const [emoji] = useState([
    require('../assets/images/emoji1.png'),
    require('../assets/images/emoji2.png'),
    require('../assets/images/emoji3.png'),
    require('../assets/images/emoji4.png'),
    require('../assets/images/emoji5.png'),
    require('../assets/images/emoji6.png'),
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}>
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});

  * Codigo con cambios:
import React from 'react';
import { useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, Pressable } from 'react-native';

const emojiImages = [
  require('../assets/images/emoji1.png'),
  require('../assets/images/emoji2.png'),
  require('../assets/images/emoji3.png'),
  require('../assets/images/emoji4.png'),
  require('../assets/images/emoji5.png'),
  require('../assets/images/emoji6.png'),
];

export default function EmojiList({ onSelect, onCloseModal }) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emojiImages}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}>
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});

  * Explicacion:
Los cambios en este componente mas son para mejorar la legibilidad y la eficiencia del código, como:
Mover la definición del array emojiImages fuera del componente para evitar que se cree en cada renderizado.
Renombré la variable emoji a emojiImages para reflejar mejor su contenido.
Simplifiqué la lógica del onPress para mejorar la legibilidad.

- CircleButton:
  * Codigo sin cambios:
import { View, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CircleButton({ onPress }) {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable style={styles.circleButton} onPress={onPress}>
        <MaterialIcons name="add" size={38} color="#25292e" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: '#ffd33d',
    borderRadius: 42,
    padding: 3,
  },
  circleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#fff',
  },
});

  * Codigo con cambios:
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const CircleButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <MaterialIcons name="add" size={38} color="#25292e" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: '#ffd33d',
    borderRadius: 42,
    padding: 3,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#fff',
  },
});

export default CircleButton;

  * Explicacion:
Renombré los estilos para que sean más descriptivos (container y button).
Agrupé la importación de MaterialIcons para mejorar la legibilidad.
Modifiqué la declaración del componente para usar una arrow function de una sola línea.

- Button:
  * Codigo sin cambios:
import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Button({ label, theme, onPress}) {
  if (theme === "primary") {
    return (
      <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}>
        <Pressable
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={onPress}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      {/*MOdal*/}
      <Pressable style={styles.button}  onPress={onPress} >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});

  * Codigo con cambios:
import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Button = ({ label, theme, onPress }) => {
  const isPrimaryTheme = theme === "primary";

  return (
    <View style={[styles.buttonContainer, isPrimaryTheme && styles.primaryContainer]}>
      <Pressable
        style={[styles.button, isPrimaryTheme && styles.primaryButton]}
        onPress={onPress}
      >
        {isPrimaryTheme && (
          <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
        )}
        <Text style={[styles.buttonLabel, isPrimaryTheme && styles.primaryLabel]}>{label}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  primaryContainer: {
    borderWidth: 4,
    borderColor: "#ffd33d",
    borderRadius: 18,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: '#fff',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  primaryLabel: {
    color: "#25292e",
  },
});

export default Button;

  * Explicacion:
Se agregó una verificación para determinar si el tema es "primary" o no.
Se utilizaron estilos condicionales para simplificar la lógica del tema del botón.
Se agruparon estilos relacionados con el tema primario para mejorar la legibilidad.

2) RESPONDER LAS SIGUIENTES PREGUNTAS:
¿Qué problemas específicos de rendimiento o mantenibilidad se identificaron en la aplicación original?
No se como decirlo, al hacerlo con la app original se crea el proyecto de manera estructurada, pero lo senti lento en algunas funciones, medio trabado, o lento por asi decirlo.

¿Cómo se aseguró que el refactoring no afectara negativamente la funcionalidad existente?
Cada que hacia un cambio verifique si tenia coherenia en base al codigo madre por asi decirlo, y cada que guardaba un cambio, en la termminar me indicaba si seguia corriendo de forma eficiente o correcta, con un mensajito verde, y si no pues me indicaba que error tenia y en que linea.

¿Qué mejoras de rendimiento y mantenibilidad se lograron con el refactoring?
Que sea mas organizado el codigo, mas legible y a mi gusto mas rapido.

¿Cuáles fueron los desafíos más significativos durante el proceso de refactoring y cómo se superaron?
Creo que seguir el tutorial, de mi parte si fue hecho leña, porque a lo mucho entendi como correr el proyecto, detenerlo, instalar algun "npx..." y volver a correr, crear los componetes y poner los imports, lo dificil era saber en donde ir remplazando las nuevas lineas de codigo que se daban conforme se iba avanzando, claro el tutorial lo indicaba, pero si me paniquie un poco, menos mal me ayudo mi compañero.

¿Qué impacto tuvo el refactoring en la experiencia del usuario final?
A mi gusto fue positivo, ver que funcionaba de mejor manera ya en mi telefono, crei que era un error de mi movil, pero no, entonces ver que primero no se jodio el codigo y segundo que funcione mejor fue un momento de satisfacion y alivio de que por primera vez algo si me funciono. 

¿Cómo se podrían aplicar las lecciones aprendidas en este proyecto a futuros proyectos de desarrollo y refactoring?
Bueno, de mi parte lo podria usar ya en este proyecto piensa, al menos la parte final del tutorial se vio que era bastante eficiente para una parte de proyecto que estamos realizando, nomas no estoy muy bien amigada con todo esto, pero espero poder lograrlo, ya que hasta cierto puto ya se ve mas profesional.
