import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage'

const App = () => {

    useEffect(() => {

        AsyncStorage.getItem('@telefone')
            .then((res) => {

                const temp = JSON.parse(res)
                setName(temp.name);
                setTelefone(temp.telefone);

                // alert(temp.name)

            })
            .catch(err => alert('Erro ao recuperar: ' + err));
    }, [])

    const [telefone, setTelefone] = useState('');
    const [name, setName] = useState('');

    const salvar = function () {

        const user = {
            telefone: telefone,
            name: name
        }

        AsyncStorage.setItem('@telefone', JSON.stringify(user))
            .then((res) => alert('ok !!!'))
            .catch(err => alert('Erro ao salvar: ' + err));
    }

    const apagar = function () {
        AsyncStorage.removeItem('@telefone')
            .then((res) => alert('Removido com sucesso'))
            .catch((erro) => alert("Erro ao apagar " + erro));
    }

    return (
        <View>
            <Text>Digite seu nome: </Text>
            <TextInput value={name} onChangeText={(txt) => setName(txt)} />

            <Text>Digite seu telefone: </Text>

            <TextInputMask
                style={styles.input}
                type={'cel-phone'}
                options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                }}
                value={telefone}
                onChangeText={(txt) => setTelefone(txt)}
            />
            <Text>{telefone}</Text>

            <Button title="Salvar" onPress={salvar} />
            <Button title="Apagar" onPress={apagar} />
        </View>
    )
}
const styles = StyleSheet.create({
    input: { borderWidth: 1 }
})

export default App;

