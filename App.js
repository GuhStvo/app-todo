import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
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

  const adiconarTarefa = async () => {
    if (!novaTarefa.trim()) return alert('Adicione algum caracter ao input! 😁');
    try {
      await axios.post(`${API_URL}/tarefas`, { descricao: novaTarefa });
      setNovaTarefa("");
      carregarTarefa();
    } catch (error) {
      console.log("Erro ao adicionar tarefa", error);
    }
  };

  const deletarTarefa = async (id) => {
    try {
      await axios.delete(`${API_URL}/tarefas/${id}`)
      carregarTarefa();
    } catch (error) {
      console.log('Erro ao deletar tarefa', error)
    }
  }

  useEffect(() => {
    carregarTarefa();
  }, []);

  const renderitem = ({ item }) => (
    <View style={styles.itemTarefa}>
      <Text style={styles.textoLista}>{item.descricao}</Text>
      <TouchableOpacity onPress={() => deletarTarefa(item.id)}>
        <Text style={styles.deleteTexto}>✖</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.conteudo}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.titulo}>Minhas Tarefas</Text>

      <View style={styles.inputContent}>
        <TextInput
          placeholder="Digite uma tarefa"
          value={novaTarefa}
          onChangeText={setNovaTarefa}
          style={styles.input}
        />

        <TouchableOpacity style={styles.botaoAdd} onPress={adiconarTarefa}>
          <Text style={styles.botaoAddTexto}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList // Retornando para aplicação o que eu quero que apareça
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderitem}
        contentContainerStyle={styles.listaTarefa}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    padding: 20,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1A1A1A",
  },
  inputContent: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  botaoAdd: {
    backgroundColor: "#0066CC",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  botaoAddTexto: {
    color: "#fff",
    fontWeight: "bold",
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
  deleteTexto: {
    color: '#CC0000',
    fontSize: 18,
    paddingHorizontal: 8
  },
});
