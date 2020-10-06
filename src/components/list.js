import h from "../library/hyperscript";

export function list(list) {
return h('ul', {}, ...list);
}