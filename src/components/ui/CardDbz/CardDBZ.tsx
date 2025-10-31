import type { Character } from "@/interfaces/character.model";
import simboloDBZ from "@/assets/images/simboloDBZ_result.webp";


export function CardDBZ(props: Character) {
  return (
    <div className="relative w-full h-96 bg-radial from-amber-300 to-orange-600 rounded-xl shadow-[5px_5px_5px] shadow-orange-600  overflow-hidden group-hover/cards:not-hover:grayscale-50 transition-all duration-300">
      <div className="h-full bg-black/10 blur-xs ">
        <img
          className="absolute top-6/12 left-6/12 -translate-6/12 h-24"
          src={simboloDBZ}
          alt="simbolo DBZ"
        />
      </div>
      <div className="h-full absolute inset-0 p-4">
        <h1 className="text-4xl text-center text-white mb-5 text-shadow-saiyan text-shadow-black">
          {props.name}
        </h1>
        <ul className="font-bold font-serif text-white">
          <li>
            <span className="text-black">ki: </span>
            {props.ki}
          </li>
          <li>
            <span className="text-black">MaxKi: </span>
            {props.maxKi}
          </li>
          <li>
            <span className="text-black">Race: </span>
            {props.race}
          </li>
          <li>
            <span className="text-black">Gender: </span>
            {props.gender}
          </li>
        </ul>
        <img
          className="absolute -bottom-[14%] left-[45%] h-[80%]  drop-shadow-neutral-950 drop-shadow-sm mask-b-from-30% mask-b-to-70%"
          src={props.image}
          alt={props.name}
        />
      </div>
    </div>
  );
}
