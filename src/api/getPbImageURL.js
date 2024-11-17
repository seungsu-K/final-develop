export default function getPbImageURL(item, fileName = 'image') {
  return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${
    item.id
  }/${item[fileName]}`;
}

export function getPostImageURL(item, fileName) {
  return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${
    item.id
  }/${fileName}`;
}
