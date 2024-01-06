package com.kokochi.kokocastserver.domain.channel;

import com.kokochi.kokocastserver.domain.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChannelRepository extends MongoRepository<Channel, String> {
}
