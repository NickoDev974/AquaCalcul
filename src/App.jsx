import { useState } from "react";
import "./App.css";

//image import
import aquaCube from "./assets/picture/aqua-cube.jpg";
import cilinderCube from "./assets/picture/volume_cylindre.png";
import medoc from "./assets/picture/calculs-medocs.jpg";
import bache from "./assets/picture/bache-bassin.jpg";
import cemaqua from "./assets/picture/cemaqua.png";

function App() {
  // États pour le calcul du volume cubique
  const [cubeLength, setCubeLength] = useState(0);
  const [cubeWidth, setCubeWidth] = useState(0);
  const [cubeHeight, setCubeHeight] = useState(0);
  const [volumeCube, setVolumeCube] = useState(null);

  // États pour le calcul du volume cylindrique
  const [radius, setRadius] = useState(0);
  const [heightCyl, setHeightCyl] = useState(0);
  const [volumeCylinder, setVolumeCylinder] = useState(null);

  // États pour le calcul du traitement
  const [treatmentQuantity, setTreatmentQuantity] = useState(0);
  const [treatmentVolume, setTreatmentVolume] = useState(0);
  const [waterVolume, setWaterVolume] = useState(0);
  const [requiredTreatment, setRequiredTreatment] = useState(null);

  // États pour le calcul de la bâche
  const [bacheLength, setBacheLength] = useState(0);
  const [bacheWidth, setBacheWidth] = useState(0);
  const [bacheHeight, setBacheHeight] = useState(0);
  const [bacheRealWidth, setBacheRealWidth] = useState(null);
  const [bacheRealLength, setBacheRealLength] = useState(null);

  // Surface à peindre
  const [paintLength, setPaintLength] = useState(0);
  const [paintWidth, setPaintWidth] = useState(0);
  const [paintHeight, setPaintHeight] = useState(0);
  const [surfaceToPaint, setSurfaceToPaint] = useState(null);

  // Calcul du volume cubique
  const calculateCubeVolume = () => {
    const volume = (cubeLength * cubeWidth * cubeHeight) / 1000; // Conversion en litres
    setVolumeCube(volume.toFixed(2));
  };

  // Calcul du volume cylindrique
  const calculateCylinderVolume = () => {
    const volume = (Math.PI * Math.pow(radius, 2) * heightCyl) / 1000; // Conversion en litres
    setVolumeCylinder(volume.toFixed(2));
  };

  // Calcul du dosage de traitement
  const calculateTreatment = () => {
    const result = (treatmentQuantity / treatmentVolume) * waterVolume; // Règle de trois
    setRequiredTreatment(result.toFixed(2)); // Résultat en ml
  };

  // Calcul de la bâche pour un bassin cubique
  const calculateBache = () => {
    const bacheL = 1 + parseFloat(bacheLength) + parseFloat(bacheHeight) * 2;
    const bacheW = 1 + parseFloat(bacheWidth) + parseFloat(bacheHeight) * 2;
    const availableWidths = [4, 6, 8, 10];
    const selectedWidth = availableWidths.find((w) => w >= bacheW);
    const selectedLength = Math.ceil(bacheL);
    setBacheRealWidth(selectedWidth);
    setBacheRealLength(selectedLength);
  };

  // Calcul de la surface à peindre
  const calculateSurfaceToPaint = () => {
    const bottomSurface = paintLength * paintWidth;
    const sideSurface1 = 2 * (paintLength * paintHeight); // 2 parois de longueur * hauteur
    const sideSurface2 = 2 * (paintWidth * paintHeight); // 2 parois de largeur * hauteur
    const totalSurface = bottomSurface + sideSurface1 + sideSurface2;
    setSurfaceToPaint(totalSurface.toFixed(2));
  };

  return (
    <>
      <section className="title">
        <h1>Aqua Calcul</h1>
        <p>Tout pour les calculs dans l'aquariophilie</p>
      </section>
      {/* Section calcul du volume */}
      <section className="volume">
        <h2>Calcul de volume</h2>
        <p>Combien de litres dans mon aquarium ou mon bassin ?</p>

        {/* Volume d'un aquarium cubique */}
        <article>
          <h3>Volume d'un Cube</h3>
          <img
            src={aquaCube}
            alt="volume aquarium pavé"
            className="imgSection"
          />
          <label htmlFor="cubeLength">Longueur (cm)</label>
          <input
            id="cubeLength"
            type="number"
            value={cubeLength}
            onChange={(e) => setCubeLength(e.target.value)}
          />
          <label htmlFor="cubeWidth">Largeur (cm)</label>
          <input
            id="cubeWidth"
            type="number"
            value={cubeWidth}
            onChange={(e) => setCubeWidth(e.target.value)}
          />
          <label htmlFor="cubeHeight">Hauteur (cm)</label>
          <input
            id="cubeHeight"
            type="number"
            value={cubeHeight}
            onChange={(e) => setCubeHeight(e.target.value)}
          />
          <button onClick={calculateCubeVolume}>Calculer le volume</button>
          {volumeCube && (
            <p>
              Le volume de votre aquarium cubique est de{" "}
              <span>{volumeCube} litres</span>.
            </p>
          )}
        </article>
        <article>
          {/* Volume d'un aquarium cylindrique */}
          <h3>Volume d'un Cylindre</h3>
          <img
            src={cilinderCube}
            alt="volume aquarium cylindre"
            className="imgSection"
          />
          <label htmlFor="radius">Rayon (cm)</label>
          <input
            id="radius"
            type="number"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
          />
          <label htmlFor="heightCyl">Hauteur (cm)</label>
          <input
            id="heightCyl"
            type="number"
            value={heightCyl}
            onChange={(e) => setHeightCyl(e.target.value)}
          />
          <button onClick={calculateCylinderVolume}>Calculer le volume</button>
          {volumeCylinder && (
            <p>
              Le volume de votre aquarium cylindrique est de{" "}
              <span>{volumeCylinder} litres</span>.
            </p>
          )}
        </article>
      </section>
      {/* Section calcul du dosage de traitement */}
      <section>
        <h2>Dosage de traitement</h2>
        <p>
          Calculez la quantité de traitement nécessaire en fonction du volume
          d'eau.
        </p>
        <img src={medoc} alt="calcul medication" className="imgSection" />

        <label htmlFor="treatmentQuantity">Quantité de traitement (ml)</label>
        <input
          id="treatmentQuantity"
          type="number"
          value={treatmentQuantity}
          onChange={(e) => setTreatmentQuantity(e.target.value)}
        />
        <label htmlFor="treatmentVolume">
          Volume d'eau pour cette quantité (L)
        </label>
        <input
          id="treatmentVolume"
          type="number"
          value={treatmentVolume}
          onChange={(e) => setTreatmentVolume(e.target.value)}
        />
        <label htmlFor="waterVolume">Volume d'eau à traiter (L)</label>
        <input
          id="waterVolume"
          type="number"
          value={waterVolume}
          onChange={(e) => setWaterVolume(e.target.value)}
        />
        <button onClick={calculateTreatment}>Calculer le dosage</button>
        {requiredTreatment && (
          <p>
            Vous avez besoin de <span>{requiredTreatment} ml </span>de
            traitement.
          </p>
        )}
      </section>
      {/* Section calcul de la bâche */}
      <section>
        <h2>Calcul de bâche</h2>
        <p>
          Calcul de la taille de la bâche nécessaire pour un bassin cubique.
        </p>
        <img src={bache} alt="pose de bache" className="imgSection" />

        <label htmlFor="bacheLength">Longueur (m)</label>
        <input
          id="bacheLength"
          type="number"
          value={bacheLength}
          onChange={(e) => setBacheLength(e.target.value)}
        />
        <label htmlFor="bacheWidth">Largeur (m)</label>
        <input
          id="bacheWidth"
          type="number"
          value={bacheWidth}
          onChange={(e) => setBacheWidth(e.target.value)}
        />
        <label htmlFor="bacheHeight">Hauteur (m)</label>
        <input
          id="bacheHeight"
          type="number"
          value={bacheHeight}
          onChange={(e) => setBacheHeight(e.target.value)}
        />
        <button onClick={calculateBache}>Calculer la taille de la bâche</button>
        {/* Affichage des dimensions réelles calculées */}
        {bacheLength && bacheWidth && bacheHeight && (
          <p>
            La taille réelle de la bâche nécessaire est de{" "}
            {(
              parseFloat(bacheLength) +
              1 +
              parseFloat(bacheHeight) * 2
            ).toFixed(2)}{" "}
            m de longueur et{" "}
            {(parseFloat(bacheWidth) + 1 + parseFloat(bacheHeight) * 2).toFixed(
              2
            )}{" "}
            m de largeur.
          </p>
        )}

        {/* Affichage de la coupe à réaliser */}

        {bacheRealLength && bacheRealWidth && (
          <p>
            Vous devrez couper une bâche de <span>{bacheRealLength} m</span> de
            longueur sur une largeur de <span>{bacheRealWidth} m </span>
            (en fonction des largeurs disponibles : 4m, 6m, 8m, 10m).
          </p>
        )}
      </section>
      {/* Section calcul de la surface à peindre */}
      <section>
        <h2>Calcul de la surface à peindre</h2>
        <p>Calculez la surface des 5 faces à peindre d'un bassin cubique.</p>
        <img src={cemaqua} alt="Pose de cemaqua" className="imgSection" />

        <label htmlFor="paintLength">Longueur (m)</label>
        <input
          id="paintLength"
          type="number"
          value={paintLength}
          onChange={(e) => setPaintLength(e.target.value)}
        />
        <label htmlFor="paintWidth">Largeur (m)</label>
        <input
          id="paintWidth"
          type="number"
          value={paintWidth}
          onChange={(e) => setPaintWidth(e.target.value)}
        />
        <label htmlFor="paintHeight">Hauteur (m)</label>
        <input
          id="paintHeight"
          type="number"
          value={paintHeight}
          onChange={(e) => setPaintHeight(e.target.value)}
        />
        <button onClick={calculateSurfaceToPaint}>
          Calculer la surface à peindre
        </button>

        {surfaceToPaint && (
          <p>
            La surface totale à peindre est de <span>{surfaceToPaint} m²</span>.
          </p>
        )}
      </section>
    </>
  );
}

export default App;
