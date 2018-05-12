import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  calloutContainer: {
    backgroundColor: '$lightGreen',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
    justifyContent: 'center',
  },
  calloutHeading: {
    padding: 5,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  providerLogo: {
    marginTop: 10,
    width: 50,
    height: 50,

  },

  buttonContainer: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },

  btn: {
    marginBottom: 100,
    backgroundColor: 'green',
  },

});
