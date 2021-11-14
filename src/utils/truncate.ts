export default function truncate(text:string,maxlen:number=50):string{
  return text.length > maxlen? text.substring(0,maxlen-3)+"...":text;
}
