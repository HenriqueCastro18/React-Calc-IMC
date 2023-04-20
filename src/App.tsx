import { useState } from 'react'
import styles from './App.module.css'
import powerImage from './assets/powered.png'
import { levels, calculetaIMC, Level } from './helpers/imc';
import { GridItem } from './components/GridItem/index'
import leftArrowImage from './assets/leftarrow.png'

const App = () => {
  
  const [heightField, setHeightField] = useState<number>(0);

  const [weightField, setWeightField] = useState<number>(0)

  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () =>{
    if(heightField && weightField){
      setToShow(calculetaIMC(heightField, weightField));
    }

    else{
      alert('Digite todos os campos.')
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }


  return (
    <div className={styles.main}>
      
      <header>
        <div className={styles.headerContainer}>
          <img src={powerImage}  width={150} />
        </div>
      </header>

      <div className={styles.container}>
        
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC.</h1>

          <p>Índice de Massa Corporal, conhecido pela sigla IMC, é um cálculo simples que permite medir se alguém está ou não com o peso ideal.</p>

          <input  
            type='number'
            placeholder='Digite a sua altura. Ex: 1.5 (em Métros)'
            value={heightField > 0 ? heightField: ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />

          <input  
            type='number'
            placeholder='Digite a seu peso. Ex: 80.4 (em kg)'
            value={weightField > 0 ? weightField: ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />

          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>

        <div className={styles.rightSide}>
          {!toShow &&
            
            <div className={styles.grid}>
              {levels.map((item, key) =>
                <GridItem key={key} item={item} />
              )}
          </div>

          }
          {toShow &&

            <div className={styles.rigthBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25}/>
              </div>
              <GridItem item={toShow}/>
            </div>
            
          }
        </div>

      </div>
    </div>
  )
}

export default App
