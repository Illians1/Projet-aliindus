import React, { useContext } from "react";
import ContextBL from "../../Context/ContextBL";

function ModifyBL(props) {
  const { setAffichageBloc, setFormData, listUsers, listClients } = useContext(
    ContextBL
  );

  const convertDate = (itemDate) => {
    const dd = itemDate.split("/")[0];
    const mm = itemDate.split("/")[1];
    const yyyy = itemDate.split("/")[2];
    const newDate = [yyyy, mm, dd].join("-");
    return newDate;
  };

  const modifyBlock = () => {
    let item = props.item;
    setAffichageBloc(item);

    let client = "";
    listClients.forEach((element) => {
      if (element.code === item.codeClient) {
        client = element.nom + " - " + element.code;
      }
    });
    let user = "";
    listUsers.forEach((element) => {
      if (element.pseudo === item.pseudo) {
        user = element.pseudo;
      }
    });

    setFormData({
      client: client == null ? "" : client,
      date: convertDate(item.date),
      user: user == null ? "admin.admin" : user,
      numCarnet: item.numeroCarnet == null ? "" : item.numeroCarnet,
      numBL: item.numeroBl == null ? "" : item.numeroBl,
      infos: item.info == null ? " " : item.info,
    });
    window.scrollTo(0, 0);
  };

  return (
    <span onClick={modifyBlock} className="link-modif">
      Modifier
    </span>
  );
}

export default ModifyBL;
