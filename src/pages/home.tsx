import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bot, Play, Power, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Howl } from "howler";

const TIPOS = [
  "DIGITUNDER-4",
  "DIGITUNDER-5",
  "DIGITUNDER-6",
  "DIGITUNDER-4",
  "DIGITUNDER-1",
  "DIGITUNDER-3",
  "DIGITUNDER-4",
  "DIGITUNDER-7",
  "DIGITUNDER-8",
];

const REFS = [
  "482234225228",
  "482234222228",
  "482234229228",
  "482234229228",
  "482234229228",
  "482234229228",
  "482234229228",
  "482234229228",
  "482234229228",
];

interface TableProps {
  hora: string;
  tipo: string;
  ref: string;
  entrada: number;
  saida: number;
  preco: number;
}

function Home() {
  const INITIAL_VALUE = 0;
  const [metaLucro, setMetaLucro] = useState(INITIAL_VALUE);
  const [perdasGanhos, setPerdasGanhos] = useState(0);
  const [status, setStatus] = useState(false);
  const [table, setTable] = useState<TableProps[]>([]);
  const [numerosPositivos, setNumerosPositivos] = useState(0);
  const [numerosNegativos, setNumerosNegativos] = useState(0);

  const handleClickInit = () => {
    setStatus(true);
    const novaMeta = 80;

    if (!isNaN(novaMeta)) {
      incrementar(INITIAL_VALUE, novaMeta);
    } else {
      alert("Por favor, insira um valor numérico válido!");
    }
  };

  const incrementar = (valorAtual: number, meta: number) => {
    const incrementos = [10, 11, 10, -11, 20, 10, 10, 10, 10];
    let currentLucro = valorAtual;
    let positivos = 0;
    let negativos = 0;

    const executeIncrement = (index: any) => {
      if (index >= incrementos.length || currentLucro >= meta) {
        if (currentLucro >= meta) {
          // console.log("Meta de lucro atingida!");
          const sound = new Howl({
            src: ["/cash.mp3"],
            volume: 1.0,
          });
          sound.play();
          setStatus(false);
          setPerdasGanhos(0);

          setTimeout(() => {
            Swal.fire({
              html: `<p style="position: relative;
              max-width: 100%;
              margin: 0;
              padding: 0.8em 1em 0;
              color: inherit;
              font-size: 1.875em;
              font-weight: 600;
              text-align: center;
              text-transform: none;
              word-wrap: break-word;
              color: #545454;
              ">Você acaba de ganhar <br> <span style="color: #5ec086; font-size: 40px;"> $130.00! </span></p><br><br><p style="margin-bottom: 20px;">Agora cadastre a sua <strong>CHAVE PIX</strong> e realize seu primeiro <strong>SAQUE</strong>.</p> <br> <a href="/payment" style="padding: .625em 1.1em; border-radius: .25em; cursor: pointer; background-color: #000; color: #fff;">CADASTRAR CHAVE</a><br><br>`,
              icon: "success",
              showConfirmButton: false,
            });
          }, 500);
        }
        return;
      }

      const incremento = incrementos[index];
      currentLucro += incremento;

      if (incremento > 0) {
        positivos++;
      } else if (incremento < 0) {
        negativos++;
      }

      setPerdasGanhos((prevLucro) => prevLucro + incremento);
      setTable((prev) => [
        ...prev,
        {
          hora: new Date().toString(),
          tipo: TIPOS[index],
          ref: REFS[index],
          entrada: currentLucro - incremento,
          saida: currentLucro,
          preco: incremento,
        },
      ]);

      setTimeout(() => {
        setMetaLucro(currentLucro);
        executeIncrement(index + 1);
      }, 1000);
    };

    executeIncrement(0);
    setInterval(() => {
      setNumerosPositivos(positivos);
      setNumerosNegativos(negativos);
    }, 1000);
  };

  useEffect(() => {
    const getLstg = localStorage.getItem("modal");
    if (!getLstg) {
      localStorage.setItem("modal", "true");

      Swal.fire({
        title: "PARABENS!",
        html: `<br><p>Você recebeu acesso gratuito a Alfa Tech e ganhou <span style="color: #5ec086"> $50.00! </span> <br> <br> Aperte em <span style="color: #712bb7">“INICIAR SOFTWARE”</span> para aumentar seu saldo e realizar o primeiro <strong>SAQUE</strong>.</p>`,
      });
    }
  }, []);

  const [cores, setCores] = useState(["cinza", "cinza", "cinza"]);
  const [texto, setTexto] = useState("");

  const handleClick = () => {
    setCores((prevCores) => {
      const novaCores = [...prevCores];
      novaCores[0] = "verde";
      return novaCores;
    });
    setTexto("Analisando");
    setTimeout(() => {
      setTexto("Contrato aberto");
      setCores((prevCores) => {
        const novaCores = [...prevCores];
        novaCores[1] = "verde";
        return novaCores;
      });
    }, 2500);
    setTimeout(() => {
      setCores((prevCores) => {
        const novaCores = [...prevCores];
        novaCores[2] = "verde";
        return novaCores;
      });
    }, 11000);
    setTimeout(() => {
      setTexto("");
    }, 12000);
  };

  return (
    <div id="bgFundo">
      <main className="z-10 bg-[#260844D8] h-full text-center">
        <div className="w-full p-3 grid gap-4">
          <div className="flex gap-3">
            <div className="rounded-2xl p-[10px_25px] border-red-500 border-2 flex items-center justify-center text-red-500">
              <Power className="w-[30px] h-[30px]" />
            </div>
            <div className="border border-white rounded-2xl flex justify-between items-center flex-1 gap-3 p-4 text-white">
              <div className="flex flex-col gap-1">
                <p className="text-[18px]">Conta Real</p>
                <p className="text-xs text-[#BBBBBB]">cr78493148 - USD</p>
              </div>
              <RefreshCw className="w-[20px] h-[20px]" />
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="border border-white text-white w-full rounded-xl p-4 flex items-start flex-col">
              <span className="text-[12,8px] text-[#DDDD]">Saldo</span>
              <p className="font-bold text-[18px] text-white">
                ${(metaLucro + 50).toFixed(2)}
              </p>
            </div>
            <div
              className={cn(
                "border p-4 w-full text-white rounded-xl flex items-start flex-col",
                status
                  ? metaLucro === 20
                    ? "border-red-500"
                    : "border-green-500"
                  : "border-white"
              )}
            >
              <span
                className={
                  status
                    ? metaLucro === 20
                      ? "text-[12,8px] text-red-500"
                      : "text-[12,8px] text-green-500"
                    : "text-[12,8px] text-white"
                }
              >
                Lucro / Prejuizo
              </span>
              <p
                className={
                  status
                    ? metaLucro === 20
                      ? "font-bold text-[18px] text-red-500"
                      : "font-bold text-[18px] text-green-500"
                    : "font-bold text-[18px] text-white"
                }
              >
                ${metaLucro.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-white mt-5 text-base">
          <span>
            <Bot />
          </span>
          {"  "}
          IA Easy
        </div>
        <h1 className={cn("text-2xl text-white/80 mt-10")}>
          Software{status ? " operando" : " parado"}
        </h1>
        <div className="flex justify-center items-center h-8">
          <div className="flex flex-col">
            <p className="text-white/80 mt-10 mb-2 h-6">{texto}</p>
            <div className="flex justify-center items-center h-8">
              {cores.map((cor, index) => (
                <div
                  key={index}
                  className={`w-16 h-2.5 mx-2 rounded-full ${
                    cor === "verde" ? "bg-[#5ec086]" : "bg-gray-300"
                  } transition-colors duration-500 ease-in-out`}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-24 gap-4">
          <Button
            variant={"secondary"}
            size={"lg"}
            disabled={status}
            className={cn(
              "border text-white gap-2 border-green-600 bg-[#26D482]/30 animate-bounce"
            )}
            onClick={() => {
              handleClick(), handleClickInit();
            }}
          >
            <Play />
            {status ? "Parar" : "Iniciar"} Software
          </Button>
        </div>
        <div className="mt-10 border border-blue-800 mx-4 rounded-2xl overflow-hidden">
          <div className="border-blue-800 bg-blue-800 py-3 text-white">
            Tabela
          </div>
          <div className="p-3">
            <div className="flex items-center justify-between">
              <h1 className="text-[19px] text-white">Histórico de Operações</h1>
              <p className="text-white">
                <span className="text-base text-[#5EC086]">
                  {numerosPositivos}
                </span>{" "}
                /{" "}
                <span className="text-base text-[#e17d81]">
                  {numerosNegativos}
                </span>
              </p>
            </div>
            <table className="w-full border border-[#8627FFBC] rounded-lg mt-5 overflow-scroll">
              <thead>
                <tr className="bg-[#101017] text-white flex items-center gap-1">
                  <th className="p-2">Hora</th>
                  <th className="p-2">Tipo</th>
                  <th className="p-2 flex items-center gap-2">Ref</th>
                  <th>Entrada</th>
                  <th>Saída</th>
                  <th>Preço</th>
                </tr>
              </thead>
              <tbody className="block">
                {table.map((item, idx) => (
                  <tr className="text-white" key={idx}>
                    <td className="p-2">
                      {new Date(item.hora).toDateString()}
                    </td>
                    <td className="p-2">{item.tipo}</td>
                    <td className="p-2">{item.ref}</td>
                    <td className="p-2">{item.entrada}</td>
                    <td className="p-2">{item.saida}</td>
                    <td className="p-2">{item.preco}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ visibility: "hidden" }}>{perdasGanhos}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
