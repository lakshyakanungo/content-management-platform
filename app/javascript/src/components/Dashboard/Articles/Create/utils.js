export const buildCategorySelectOptions = categories => {
  const options = categories.map(category => ({
    id: category.id,
    label: category.name,
    value: category.id,
  }));

  // console.log(options, "<--options");
  return options;
};

export const extractTitle = jsonOfEditorContent =>
  jsonOfEditorContent.content[0].content[0].text;

// [
//   {
//     label: "Category 1",
//     value: "value 1",
//   },
//   {
//     label: "Category 2",
//     value: "value 2",
//   },
//   {
//     label: "Category 3",
//     value: "value 3",
//   },
//   {
//     label: "Category 4",
//     value: "value 4",
//   },
// ]}
