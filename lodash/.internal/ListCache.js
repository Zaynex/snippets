import assocIndexOf from './assocIndexOf.js'

class ListCache {
    /**
     * Creates an list cache object.
     *模拟一个 Map 结构
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    constructor(entries) {
        let index = -1
        const length = entries == null ? 0 : entries.length

        this.clear()

        while(++index < length) {
            const entry = entries[index]
            this.set(entry[0], entry[1])
        }
    }

    clear() {
        this.__data__ = []
        this.size = 0
    }

    delete(key) {
        const data = this.__data__
        const index = assocIndexOf(data, key)

        if(index < 0) {
            return false
        }
        const lastIndex = data.length - 1
        if(index == lastIndex) {
            data.pop()
        } else {
            data.splice(index, 1)
        }
        --this.size
        return true
    }

    get(key) {
        const data = this.__data__
        const index = assocIndexOf(data, key)
        return index < 0 ? undefined : data[index][1]
    }

    has(key) {
        return assocIndexOf(this.__data__, key) > -1
    }

    set(key, value) {
        const data = this.__data__
        const index = assocIndexOf(data, key)

        if(index < 0) {
            ++this.size
            data.push([key, value])
        } else {
            data[index][1] = value
        }
        return this
    }
}

export default ListCache