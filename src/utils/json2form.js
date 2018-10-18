/**
 * Created by TY-xie on 2018/9/4.
 */
export const json2Form = (json) => {
  var str = []
  for (let p in json) {
	str.push(encodeURIComponent(p) + '=' + encodeURIComponent(json[p]))
  }
  return str.join('&')
}