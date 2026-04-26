// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields. 
 */
class InMemoryGeoTagStore {

    #geotags = [];

    addGeoTag(geotag) {
        this.#geotags.push(geotag);
    }

    removeGeoTag(name) {
        this.#geotags = this.#geotags.filter(tag => tag.name !== name);
    }

    getNearbyGeoTags(location, radius) {
        return this.#geotags.filter(tag => this.#distance(location, tag) <= radius);
    }

    searchNearbyGeoTags(location, keyword, radius) {
        const lower = keyword.toLowerCase();
        return this.getNearbyGeoTags(location, radius).filter(tag =>
            tag.name.toLowerCase().includes(lower) ||
            tag.hashtag.toLowerCase().includes(lower)
        );
    }

    #distance(loc, tag) {
        const R = 6371;
        const dLat = this.#toRad(tag.latitude - loc.latitude);
        const dLon = this.#toRad(tag.longitude - loc.longitude);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(this.#toRad(loc.latitude)) *
            Math.cos(this.#toRad(tag.latitude)) *
            Math.sin(dLon / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    #toRad(deg) {
        return deg * (Math.PI / 180);
    }

}

module.exports = InMemoryGeoTagStore
