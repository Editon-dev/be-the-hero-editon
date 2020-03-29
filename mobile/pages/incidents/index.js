import React from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import logoImg from '../../src/assets/logo.png';
import {useNavigation} from '@react-navigation/native'
import {Feather} from '@expo/vector-icons'

import styles from './styles';
import { useEffect, useState } from 'react';
import api from '../../src/services/api';

export default function Incidents() {
    const navigation = useNavigation();
    const [incident, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDetail(incident){
        navigation.navigate('Details', {incident});
    }

    async function loadIncidents (){
        if(loading){
            return;
        }

        if (total > 0 && incident.length == total){
            return;
        }

        setLoading(true);

        const response = await api.get(`incidents?page=${page}`);
        setIncidents([...incident, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {loadIncidents();}, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text styles={styles.headerTextBold}>{total} casos</Text>.
                </Text>
                </View>
                <Text style={styles.title}>Bem vindo!</Text>
                <Text style={styles.descrition}>Escolha um dos casos abaixo
                e salve o dia.</Text>

            <FlatList 
                style={styles.incidentsList}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                data={incident}
                keyExtractor={incident => String(incident.id)}
                renderItem={({item : incident}) => (
                    <View style={styles.incidents}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{
                        Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)
                        }
                    </Text>

                    <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#e02041" />
                    </TouchableOpacity>

                </View>

                )}
            />

        </View>
    );
}