// https://xmpp.org/extensions/xep-0352.html

export const NS = 'urn:xmpp:csi:0'

export function match (features) {
  return features.getChild('csi', NS)
}

export function setActive (client) {
  client.send(<active xmlns={NS}/>)
}

export function setInactive (client) {
  client.send(<inactive xmlns={NS}/>)
}

export const streamFeature = {
  priority: 500,
  match,
  run: (client) => {
    return new Promise(resolve => {
      setActive(client)
      resolve()
    })
  }
}

export function plugin (client) {
  if (!client.options.sm) client.options.sm = {}
  if (client.registerStreamFeature) {
    client.registerStreamFeature(streamFeature)
  }
}

export default plugin
