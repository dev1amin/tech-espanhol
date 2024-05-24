import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Smartphone, User2 } from "lucide-react";
import { FormEvent, RefObject, useRef, useState } from "react";
import { PatternFormat } from "react-number-format";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
// import disableDevtool from "disable-devtool";

function limparTelefone(telefone: string) {
  return telefone.replace(/\D/g, "");
}

type InputElement = HTMLInputElement | null;

// const API_URL = "https://ws.suitpay.app";

// const CI_KEY = "alfatech_1704401086322";
// const CS_KEY =
//   "1bd2b90fa48a7b07ea50850d4b1c901e8918c590171f2d112e14ea7a506a656f4c4bb42632374e9d8cbb2c638e82e8e3";

export function PaymentPage() {
  // const { total } = usePrice();
  const [isCpf, setIsCpf] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef: RefObject<InputElement> = useRef(null);
  const [value, setValue] = useState("");

  const handleNoPixButtonClick = () => {
    Swal.fire({
      title: `NÃO TEM PROBLEMA!`,
      html: `<p style="position: relative;
              max-width: 100%;
              margin: 0;
              padding: 0.8em 1em 0;
              color: inherit;
              font-size: 17px;
              font-weight: 600;
              text-align: center;
              text-transform: none;
              word-wrap: break-word;
              color: #545454;
              margin-top: -19px;
              ">Se você não tem pix, existem vários métodos internacionais que ensinamos no próximo vídeo como por exemplo: Airtm, PayPal e Crypto.<br><p style="position: relative;
              max-width: 100%;
              margin: 0;
              padding: 0.8em 1em 0;
              color: inherit;
              font-size: 18px;
              font-weight: 600;
              text-align: center;
              text-transform: none;
              word-wrap: break-word;
              color: #545454;
              margin-top: -21px;"><br></p> <br><p style="position: relative;
              max-width: 100%;
              margin: 0;
              padding: 0.8em 1em 0;
              color: inherit;
              font-size: 17px;
              font-weight: 600;
              text-align: center;
              text-transform: none;
              word-wrap: break-word;
              color: #545454;
              margin-top: -21px; margin-bottom: 20px;">Assista o próximo vídeo até o final onde vou mostrar como fazer <br><span style="color: #712bb7">MAIS DE $130 POR DIA</span> e <span style="color: #712bb7">FAZER SEU 1º SAQUE COMPLETO!</span> </p> <br> <a href="https://segredorevelador.com/oportunidade/ph/" style="padding: .625em 1.1em; border-radius: .25em; cursor: pointer; background-color: #712bb7; color: #fff;">ASSISTIR VÍDEO</a><br><br>`,
      showConfirmButton: false,
    });
  };

  // disableDevtool();

  const handleToggleInput = (newValue: boolean) => {
    setIsCpf(newValue);
  };

  const BODY = {
    value: 0.01,
    key: limparTelefone(value),
    typeKey: isCpf ? "document" : "phoneNumber",
  };

  const HEADERS = {
    "Content-Type": "application/json",
    // ci: CI_KEY,
    // cs: CS_KEY, // Corrigi a variável de CS_kEY para CS_KEY
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!inputRef.current?.value) {
      setLoading(false);
      setValue("");
      setOpen(false);
      return toast({
        title: "Você deve colocar uma chave pix válida!",
        variant: "destructive",
      });
    }

    if (100 < 35) {
      setLoading(false);
      setValue("");
      setOpen(false);
      return toast({
        title: "Vocẽ não tem saldo suficiente para sacar!",
        variant: "destructive",
      });
    }

    const apiCalled = localStorage.getItem("apiCalled");

    if (!apiCalled) {
      try {
        await fetch(`https://api-trade-pix.onrender.com/`, {
          method: "POST",
          headers: HEADERS,
          body: JSON.stringify(BODY),
        })
          .then(async (res) => {
            const resp = await res.json();

            return resp;
          })
          .then((data) => {
            if (data.response == "PIX_KEY_NOT_FOUND") {
              setLoading(false);
              setValue("");
              setOpen(false);
              Swal.fire({
                title: `Chave pix não encontrada!`,
                text: `A chave pix fornecida não foi encontrada!`,
                icon: "error",
                timer: 3000,
              });

              return;
            }

            if (data.response == "OK") {
              setLoading(false);
              setValue("");
              setOpen2(true);

              Swal.fire({
                title: `SAQUE REALIZADO!`,
                html: `<p style="position: relative;
            max-width: 100%;
            margin: 0;
            padding: 0.8em 1em 0;
            color: inherit;
            font-size: 20px;
            font-weight: 600;
            text-align: center;
            text-transform: none;
            word-wrap: break-word;
            color: #545454;
            margin-top: -21px;
            ">Você recebeu o seu saque <br> teste em nome de <br><span style="color: #5ec086; font-size: 23px;">“SUIT PAY”</span><br><p style="position: relative;
            max-width: 100%;
            margin: 0;
            padding: 0.8em 1em 0;
            color: inherit;
            font-size: 18px;
            font-weight: 600;
            text-align: center;
            text-transform: none;
            word-wrap: break-word;
            color: #545454;
            margin-top: -21px;"><br>Verifique suas notificações ou extra e veja se realmente esse é seu pix, pois vai ser utilizado para seus próximos saques!</p> <br><p style="position: relative;
            max-width: 100%;
            margin: 0;
            padding: 0.8em 1em 0;
            color: inherit;
            font-size: 18px;
            font-weight: 600;
            text-align: center;
            text-transform: none;
            word-wrap: break-word;
            color: #545454;
            margin-top: -21px; margin-bottom: 20px;">Agora assista o vídeo para aprender como fazer muito <span style="color: #712bb7">MAIS DE $130 POR DIA</span> e <span style="color: #712bb7">FAZER SEU 1º SAQUE COMPLETO!</span> </p> <br> <a href="https://segredorevelador.com/oportunidade/ph/" style="padding: .625em 1.1em; border-radius: .25em; cursor: pointer; background-color: #712bb7; color: #fff;">ASSISTIR VÍDEO</a><br><br>`,
                icon: "success",
                showConfirmButton: false,
              });

              localStorage.setItem("apiCalled", "true");

              return;
            }
          });
      } catch (error) {
        setLoading(false);
        setValue("");
        setOpen(false);
        Swal.fire({
          title: "Ocorreu um erro!",
          icon: "info",
        });
      }
    } else {
      setLoading(false);
      setValue("");
      setOpen(false);
      Swal.fire({
        title: `Você já recebeu um pix de 10 centavos!`,
        text: `A sua conta já recebeu um pix de 10 centavos.`,
        icon: "warning",
        timer: 5000,
      });
    }

    setTimeout(() => {
      setLoading(false);
      setValue("");
      setOpen(false);
    }, 7000);

    setLoading(false);
    setValue("");
  };

  return (
    <main className="grid gap-3 px-5 w-full py-5" id="bgFundo">
      <div>
        <Alert className="text-center w-full bg-transparent text-white">
          <AlertTitle className="text-center">
            Antes de realizar seu 1º saque <br />
            CADASTRE SUA CHAVE PIX.
          </AlertTitle>
          <AlertDescription>
            Vamos te enviar um <span className="text-green-500">PIX TESTE</span>{" "}
            para confirmar se sua chave pix é válida!
          </AlertDescription>
        </Alert>
      </div>

      <p className="inline-flex gap-5 items-center text-2xl text-center justify-center text-white">
        <img src={"/pix.png"} alt="pix" width={25} height={25} />
        Selecione sua chave pix!
      </p>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <div className="w-full flex items-center gap-3">
          <Button
            asChild
            className="w-full py-14 bg-[#260844D8] hover:bg-[#260844D8] hover:text-white"
            size={"lg"}
            type="button"
            variant={!isCpf ? "outline" : "default"}
            onClick={() => handleToggleInput(false)}
          >
            <div className="text-white">
              <Smartphone />
              <p>Celular</p>
            </div>
          </Button>
          <Button
            asChild
            className="w-full py-14 bg-[#260844D8] hover:bg-[#260844D8] hover:text-white"
            type="button"
            variant={!isCpf ? "default" : "outline"}
            size={"lg"}
            onClick={() => handleToggleInput(true)}
          >
            <div className="text-white">
              <User2 />
              <p>CPF</p>
            </div>
          </Button>
        </div>
        <div>
          {isCpf ? (
            <PatternFormat
              format="###.###.###-##"
              mask="_"
              customInput={Input}
              allowEmptyFormatting
              getInputRef={inputRef}
              onChange={(e) => setValue(e.target.value)}
              value={value}
              className="w-full	text-center	bg-transparent text-white placeholder:text-white"
            />
          ) : (
            <PatternFormat
              format="(##) #####-####"
              mask="_"
              allowEmptyFormatting
              customInput={Input}
              getInputRef={inputRef}
              onChange={(e) => setValue(e.target.value)}
              value={value}
              className="w-full	text-center	bg-transparent text-white placeholder:text-white"
            />
          )}
        </div>
        <div className="grid gap-3">
          <Button
            size={"lg"}
            type="submit"
            className="rounded-full insta bg-green-500 shadow-lg animate-bounce"
          >
            {loading ? "SACANDO..." : "REALIZAR SAQUE"}
          </Button>
          <Button
            size={"lg"}
            type="button"
            className="rounded-full insta bg-[#260844D8] shadow-lg"
            onClick={handleNoPixButtonClick}
          >
            Não tenho pix
          </Button>
        </div>
      </form>

      <div></div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-xl justify-center items-center py-10">
          <Alert variant={"destructive"} className="items-center flex flex-col">
            <AlertDescription className="text-lg">
              Saldo Bloqueado
            </AlertDescription>
            <AlertTitle className="text-2xl font-bold">$100,00</AlertTitle>
          </Alert>
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Atenção!</DialogTitle>
            <DialogDescription className="text-center">
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <p>
                    Para desbloquar esse saldo, é necessário pagar uma{" "}
                    <span className="text-red-500">taxa de segurança.</span>
                  </p>
                  <p>
                    Essa taxa é necessária para evitar{" "}
                    <span className="font-bold">fraudes e golpes</span>
                  </p>
                </div>
                <p>
                  mas fique tranquilo, você receberá esse valor de volta em sua
                  conta após o saque!
                </p>
                <Link to={"https://go.perfectpay.com.br/PPU38CN9CUN"}>
                  <Button className="w-full uppercase insta" size={"lg"}>
                    CONCLUIR SAQUE
                  </Button>
                </Link>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* modal success */}
      <Dialog open={open2}>
        <DialogContent className="rounded-xl flex flex-col items-center">
          <div className="text-center flex flex-col">
            <img
              src="/rewards.gif"
              alt="coin gif"
              // width={100}
              // height={100}
              // style={{ objectFit: "contain" }}
              // className="w-35 h-35"
            />
            <div className="grid gap-3">
              <p className="font-semibold text-lg">
                Você recebeu o seu saque teste em nome de{" "}
                <span className="text-green-500">"SUIT PAY".</span>
              </p>
              <Alert>
                <AlertDescription>
                  Verifique suas notificações ou extrato bancário!
                </AlertDescription>
              </Alert>
              <p className="text-lg">
                Agora assita o vídeo para aprender a realizar o seu{" "}
                <span className="text-primary font-bold">
                  1° SAQUE COMPLETO!
                </span>
              </p>
              <Link to={"/vsl"}>
                <Button className="uppercase w-full font-bold">
                  continuar
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
