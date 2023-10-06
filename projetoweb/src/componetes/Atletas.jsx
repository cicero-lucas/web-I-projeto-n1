import React, { useState } from "react";
import imgj from '../assets/imagem/jogador.png'

export default function Atletas({setStatus,listaF,SetListaF,setVerF,setCenario}){
     const [dados,setDados]=useState({nome:"",posicao:"",idade:'',imagem:'',pais:'',numero:'',time:''})
     const [nomej,setNomej]=useState("")

     async function bucarJogador(nome) {
          const keyAp='c6ab3eba3949608ed254505b6b2913be1ac958077f4d539fa20c18c5fc14f236'
          const UrlBase=`https://apiv3.apifootball.com/?action=get_players&player_name=${nome}&APIkey=${keyAp}`
        
          try{
               let res= await fetch(UrlBase)
               let resposta= await res.json()
               setDados(
                    {nome:resposta[0].player_name,
                    posicao:resposta[0].player_type,
                    idade:resposta[0].player_age,
                    imagem:resposta[0].player_image,
                    pais:resposta[0].player_country,
                    numero:resposta[0].player_number,
                    time:resposta[0].team_name
               }
                    
               )
              
          }

          catch{
               alert("Digite o Nome do Jogador")
               setDados({nome:"",posicao:"",idade:'',imagem:'',pais:'',numero:'',time:''})
          }
          
     }


     function mostrarPesquisa(){
          if(nomej.length<0 || nomej==null || nomej==""){
               alert("Digite o Nome do Jogador!")
          }else{
               let nome=nomej
               bucarJogador(nome)
               setNomej('')
               document.getElementById('ibuscar').focus()
          }
          
     }



     function favoritarJ(){
          SetListaF([...listaF,{'nome':dados.nome,'posicao':dados.posicao,'imagem':dados.imagem,'pais':dados.pais,'numero':dados.numero,'idade':dados.idade,'time':dados.time}])
          setNomej('')
          setStatus(false)
          setVerF(false)
          setCenario(true) 
          setDados({nome:"",posicao:"",idade:'',imagem:'',pais:'',numero:'',time:''})
           
     }

     function sair(){
          setNomej('')
          setStatus(false)
          setVerF(false)
          setCenario(true) 
     }

     



     return(

          
          <>
               <section className="form">

                    <div className="campos">
                         <input type="search" name="busca" id="ibuscar" placeholder="Buscar Jogador"  value={nomej} onChange={(el)=>setNomej(el.target.value)}/>
                    </div>

                    <div className="campos">
                         <button type="button" onClick={mostrarPesquisa} id="btnB">Buscar Jogador</button>
                    </div>
                    
               </section>

               {
                    dados.idade.length<1

                    ?
                         <div className="caixainf">
                              <img src={imgj}/>
                              <p id="alerta">Não perca tempo Busque um Jogador!</p>
                         </div >

                    :
                         
                         <section className="caixaA">
                              <div className="cardJ">
                                   <div className="imgj">
                                        <img src={dados.imagem} alt="jogador" />
                                   </div>
                                   <div className="dadosJ">
                                        <h2>{dados.nome}</h2>
                                        <p>idade: {dados.idade}</p>
                                        <p> Time: {(dados.time)==''? 'Time não definido':dados.time} </p>
                                        <p>Posição:{(dados.posicao)=="Forwards"?"Atacante":(dados.posicao)=="Midfielder"?"Meio-Campo":(dados.posicao)=="Goalkeeper"?'Goleiro':'Zagueiro'} </p>
                                        <p>Numero camisa:{(dados.numero)==''?'numero não definido':dados.numero}</p>
                                        <p>Pais:{(dados.pais)==''?'pais não definido':dados.pais}</p>
                                   </div>
                                   <div className="caixaB">
                                        
                                        <button onClick={sair} className="btnS">Sair</button>
                                        <button onClick={(el)=>favoritarJ(el)} className="btnF">Favoritar</button>
                                   </div>
                              </div>
                         </section>
                    
               }
          </>
     )
}