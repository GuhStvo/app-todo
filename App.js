import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Plataform,
} from "react-native";
import axios from "axios"; // Biblioteca para requisições HTTP

const API_URL = "http://localhost:3000"; // Direcionando a URL para a nossa API

export default function App() {
  // Criando e exportando o nosso aplicativo
  const [tarefas, setTarefas] = useState([]); // Receber as tarefas novas listadas
  const [novaTarefa, setNovaTarefa] = useState(""); // Criar as novas tarefas e listar elas para listar elas na API

  const carregarTarefa = async () => {
    try {
      const requisicao = await axios.get(`${API_URL}/tarefas`); // Ele faz um get em nossa api
      setTarefas(requisicao.data); // Guardando a tarefas na nossa const
    } catch (error) {
      console.log("Erro ao carregar as tarefas:", error);
    }
  };

  useEffect(() => {
    carregarTarefa();
  }, []);

  const renderitem = ({ item }) => (
    <View style={styles.itemTarefa}>
      <Text style={styles.textoLista}>{item.descricao}</Text>
    </View>
  );

  return (
    <>
      <Text style={styles.titulo}>Minhas Tarefas</Text>
      
      <FlatList // Retornando para aplicação o que eu quero que apareça
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderitem}
        contentContainerStyle={styles.listaTarefa}
      />
    </>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1A1A1A'
  },
  listaTarefa: {
    paddingBottom: 100,
  },
  itemTarefa: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  textoLista: {
    fontSize: 16,
    color: "#333",
  },
});
