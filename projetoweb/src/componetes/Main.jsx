import React, { useEffect, useState } from "react";
import Atletas from "./Atletas";
import AtletaFavorito from "./AtletasFavoritos";
import lista from '../assets/imagem/lista.jpg'


export default function Main(){
     const salvaJ=localStorage.getItem('listaJ')
     const [staus,setStatus]=useState(false)
     const [cenario,setCenario]=useState(true)
     const [verF,setVerF]=useState(false)
     const [listaF,SetListaF]=useState(salvaJ? JSON.parse(salvaJ): [])

     function mostrarPesquisa(){
          setStatus(true)
          setVerF(false)
          setCenario(false)
     }

     function mudarStatus() {
          setVerF(true)
          setCenario(false)
          setStatus(false)
     }

     useEffect(()=>{
          localStorage.setItem('listaJ',JSON.stringify(listaF))
     },[listaF])

     return(
          <>
               <section className="caixaForm ">

                         <div className="campos">
                              <button type="button" onClick={()=>mostrarPesquisa()} >Pesquisar</button>

                              <button type="button" onClick={()=>mudarStatus()}>Ver favorito</button>
                         </div>
                    
               </section>
               

               {
                    staus 
                    
                    ?
                    <Atletas setStatus={setStatus} listaF={listaF} SetListaF={SetListaF} setVerF={setVerF} setCenario={setCenario}/>
                    :
                    cenario &&
                         <div className="caixainf">
                              <img src={lista} alt="jogador desenho" />
                         </div>
                    
               }

               {
                    verF && 

                   <AtletaFavorito listaF={listaF} SetListaF={SetListaF} setStatus={setStatus}></AtletaFavorito>
                    
               }   
                     

          </>
     )
}