export default questionData => {
  const data = questionData;
  let options = [];
  if (data.type === 'multichoice') {
    options = data.multiChoiceOptions.split ('^&*');
  }
  if (data.type === 'radio') {
    options = data.radioOptions.split ('^&*');
  }
  return new Promise ((resolve, reject) => {
    return resolve ({
      question: data.question,
      type: data.type,
      options,
    });
  });
};
