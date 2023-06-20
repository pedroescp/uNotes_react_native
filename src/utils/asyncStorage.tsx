import AsyncStorage from "@react-native-async-storage/async-storage";

// Salva um valor com uma chave
export const saveData = async (key: any, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
    //console.log(`Dados salvos com sucesso para a chave ${key}`);
  } catch (error) {
    console.log(`Erro ao salvar dados para a chave ${key}: ${error}`);
  }
};

// Obtém um valor de uma chave
export const getData = async (key: any) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(`Erro ao recuperar dados para a chave ${key}: ${error}`);
  }
};

export const removeData = async (key: any) => {
  try {
    await AsyncStorage.removeItem(key);
    //console.log(`Item removido com sucesso para a chave ${key}`);
  } catch (error) {
    console.log(`Erro ao remover item para a chave ${key}: ${error}`);
  }
};
