import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    backgroundColor: '#3386BC'
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    
  },
  
  
  title: {
    color: '#F8F7FF',
    fontSize: 28,
    fontWeight: '600',
    bottom: 50,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    color: '#F8F7FF',
    fontSize: 20,
    fontWeight: '400',
    marginBottom: -50,
    bottom: 50,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '87%',
    marginBottom: 0,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    height: 46,
    marginBottom: 10
  },
  iconContainer: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
    paddingRight: 15,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  textButtonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    top: 40
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#3D9CDA',
    height: 40,
    width: 252,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#000000',
    shadowRadius: 10,
    shadowOpacity: 0.50,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    bottom: 30
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
  color: 'red',
  fontSize: 14,
marginBottom:-10,
  bottom: 10,
  marginLeft: 10,
  alignSelf: 'flex-start',
  width: '100%'
},

errorInputWrapper: {
  borderColor: 'red',
  borderWidth: 1,
  borderRadius: 20, // Mantém o mesmo border-radius dos inputs
},
errorIcon: {
  position: 'absolute',
  right: 15,
}
});

export default styles;