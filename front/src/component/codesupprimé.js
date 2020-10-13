/* useEffect(() => {
    const newBL = [];
    props.listBL.forEach((element) => {
      newBL.push(element);
    });
    console.log(newBL);
    newBL.sort(function compare(a, b) {
      if (
        (a.nomClient == null && b.nomClient != null) ||
        (a.nomClient != null &&
          b.nomClient != null &&
          a.nomClient.localeCompare(b.nomClient) === -1)
      ) {
        return -1;
      } else if (a.nomClient === b.nomClient) {
        if (
          (a.numeroCarnet == null && b.numeroCarnet != null) ||
          (a.numeroCarnet != null &&
            b.numeroCarnet != null &&
            a.numeroCarnet < b.numeroCarnet)
        ) {
          return -1;
        } else if (a.numeroCarnet === b.numeroCarnet) {
          if (
            (a.numeroBL == null && b.numeroBL != null) ||
            (a.numeroBL != null &&
              b.numeroBL != null &&
              a.numeroBL < b.numeroBL)
          ) {
            return -1;
          } else {
            return 1;
          }
        } else {
          return 1;
        }
      } else {
        return 1;
      }
    });
    console.log(newBL);
  }); */
